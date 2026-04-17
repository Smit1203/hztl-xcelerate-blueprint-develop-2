import { GetLocalVariablesResponse, LocalVariable } from '@figma/rest-api-spec';
import { rgbToHex } from './color';
import { Token, TokensFile } from './token_types';
import { sanitizeKeyName } from './utils';

function tokenTypeFromVariable(variable: LocalVariable) {
  switch (variable.resolvedType) {
    case 'BOOLEAN':
      return 'boolean';
    case 'COLOR':
      return 'color';
    case 'FLOAT':
      return 'number';
    case 'STRING':
      return 'string';
  }
}

function tokenValueFromVariable(
  variable: LocalVariable,
  modeId: string,
  localVariables: { [id: string]: LocalVariable }
) {
  const value = variable.valuesByMode[modeId];
  if (typeof value === 'object') {
    if ('type' in value && value.type === 'VARIABLE_ALIAS') {
      const aliasedVariable = localVariables[value.id];

      if (aliasedVariable) {
        return `{${aliasedVariable.name.replace(/\//g, '.')}}`;
      }
      return;
    } else if ('r' in value) {
      return rgbToHex(value);
    }

    throw new Error(`Format of variable value is invalid: ${value}`);
  } else {
    return value;
  }
}

export function tokenFilesFromLocalVariables(localVariablesResponse: GetLocalVariablesResponse) {
  const tokenFiles: { [fileName: string]: TokensFile } = {};
  const localVariableCollections = localVariablesResponse.meta.variableCollections;
  const localVariables = localVariablesResponse.meta.variables;

  Object.values(localVariables).forEach((variable) => {
    // Skip remote variables because we only want to generate tokens for local variables
    if (variable.remote) {
      return;
    }

    // Skip deleted variables because we only want to generate tokens for active variables
    if (variable.deletedButReferenced) {
      console.warn(`Skipping deleted variable: ${variable.name}`);
      return;
    }

    const collection = localVariableCollections[variable.variableCollectionId];

    collection.modes.forEach((mode) => {
      const fileName = `${collection.name}.${mode.name}.json`;

      if (!tokenFiles[fileName]) {
        tokenFiles[fileName] = {};
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = tokenFiles[fileName];

      variable.name.split('/').forEach((groupName) => {
        obj[groupName] = obj[groupName] || {};
        obj = obj[groupName];
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const token: Token | any = {
        $type: tokenTypeFromVariable(variable),
        $value: tokenValueFromVariable(variable, mode.modeId, localVariables),
        $description: variable.description,
        $extensions: {
          'com.figma': {
            hiddenFromPublishing: variable.hiddenFromPublishing,
            scopes: variable.scopes,
            codeSyntax: variable.codeSyntax,
          },
        },
      };

      Object.assign(obj, token);
    });
  });

  return tokenFiles;
}

/**
 * Gets a map of token names so we can diff to see what tokens have been added, removed, or renamed.
 * @param localVariablesResponse The response from the Figma API's getLocalVariables endpoint.
 * @returns A map of token names by file name.
 */
export function getTokenNameMapForDiff(localVariablesResponse: GetLocalVariablesResponse) {
  const tokenFiles: { [fileName: string]: Record<string, string> } = {};
  const localVariableCollections = localVariablesResponse.meta.variableCollections;
  const localVariables = localVariablesResponse.meta.variables;

  Object.values(localVariables)
    .sort((a, b) => a.id.localeCompare(b.id))
    .forEach((variable) => {
      // Skip remote variables because we only want to generate tokens for local variables
      if (variable.remote) {
        return;
      }

      // Skip deleted variables because we only want to generate tokens for active variables
      if (variable.deletedButReferenced) {
        return;
      }

      const collection = localVariableCollections[variable.variableCollectionId];

      // We only need 1 file per collection, not per mode since they'll all have the same tokens
      const fileName = `${collection.name}.diff.json`;

      if (!tokenFiles[fileName]) {
        tokenFiles[fileName] = {};
      }

      tokenFiles[fileName][variable.id] = sanitizeKeyName(variable.name);
    });

  return tokenFiles;
}
