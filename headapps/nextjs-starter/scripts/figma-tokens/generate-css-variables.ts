/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Import dependencies
 */
import fs from 'fs';
import path from 'path';
import { EOL } from 'node:os';
import { ExtendedFigmaToken, FigmaTokenMap, getVariableType } from './variable-types';
import { sanitizeKeyName } from './utils';

/*
 * Defining a Path that contain JSON files generated in step 1
 */
const figmaTokensPath = './tokens';
const directoryPath = path.resolve(__dirname, figmaTokensPath);

function resolveTokenType(tokens: FigmaTokenMap): void {
  let depth = 0;
  for (const key in tokens) {
    const token = tokens[key];
    const type = getVariableType(token, key, false);
    token.resolvedType = type;
  }
  do {
    const variableTokens = Object.values(tokens).filter(
      (token) => token.resolvedType === 'VARIABLE'
    );
    for (const token of variableTokens) {
      if (typeof token.$value !== 'string') {
        throw new Error(`Variable token value is not a string: ${token.$value}`);
      }
      const variableName = token.$value.replace('{', '').replace('}', '');
      const variableToken = tokens[variableName];
      if (!variableToken) {
        console.warn(tokens);
        throw new Error(`Variable token not found: ${variableName}`);
      }
      token.resolvedType = getVariableType(variableToken, variableName);
    }
    const hasVariable = variableTokens.length > 0;
    if (!hasVariable) {
      return;
    }
    depth++;
  } while (depth < 10);

  throw new Error('Max depth reached');
}

function parseValue(token: ExtendedFigmaToken, key: string) {
  const type = token.$type;
  const value = token.$value;

  if (typeof value === 'string' && value?.startsWith('{')) {
    const variableName = value.replace('{', '').replace('}', '');
    return `var(--${sanitizeKeyName(variableName)})`;
  }

  const variableType = getVariableType(token, key);
  if (type === 'number') {
    const numberValue = Number(value);
    if (
      variableType === 'width' ||
      variableType === 'height' ||
      variableType === 'min-width' ||
      variableType === 'min-height' ||
      variableType === 'max-width' ||
      variableType === 'max-height' ||
      variableType === 'font-size' ||
      variableType === 'spacing' ||
      variableType === 'blur' ||
      variableType === 'border-radius' ||
      variableType === 'border-width' ||
      variableType === 'backdrop-blur'
    ) {
      return `${value}px`;
    }
    if (variableType === 'opacity') {
      return `${numberValue / 100}`;
    }
    return `${value}`;
  }

  if (typeof value === 'string') {
    if (variableType === 'color' || variableType === 'font-weight') {
      return `${value}`;
    }
    if (variableType === 'font-family') {
      return `var(--font-${value.toLowerCase().replace(/\s+/g, '-')})`;
    }

    if (type === 'string') {
      return `"${value}"`;
    }
  }

  if (type === 'boolean') {
    return null;
  }

  return `${value}`;
}
/*
 * Updating the jsonFiles that already contains DefaultVariables
 * Replace the values that refer to another variables with values from Global Default
 * Replace variable placeholders with value reference
 * replacePlaceholders(jsonFiles[key], globalDefault);
 * Replace the values that refer to another variables inside of the same theme
 * Replace variable placeholders with value reference
 * Verify one more time if there are remaining {values} that point to another variables after Desktop, Tablet, and Mobile overrides.
 * Add desktop, tablet, mobile prefix in front of Device variables
 */
async function createThemeConfig() {
  try {
    const fileNames = await fs.promises.readdir(directoryPath);
    const jsonFiles: { [key: string]: any } = {};

    // Regular processing of all files
    fileNames.forEach((fileName) => {
      if (path.extname(fileName) === '.json') {
        const filePath = path.join(directoryPath, fileName);
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const data = require(filePath);
        let sanitizedFileName = path.basename(fileName, '.json');
        sanitizedFileName = sanitizeKeyName(sanitizedFileName, true);
        jsonFiles[sanitizedFileName] = data;
      }
    });

    await writeTsFiles(jsonFiles);

    await writeCssFiles(jsonFiles);

    await writeThemeConfigFile(jsonFiles);
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error generating output file:', error);
  }
}

/*
 *  Calling the createThemeConfig function to generate the 'theme-config.ts' file that contains all variables from nested JSON objects in 'figma-tokens/' folder
 */
createThemeConfig();

async function writeThemeConfigFile(jsonFiles: { [key: string]: any }) {
  let themeConfigFileContent = `/* prettier-ignore */
const themeConfig = {${EOL}`;

  const { globalConfig, deviceConfigs, brandConfigs, themeConfigs } =
    splitJsonFileConfigs(jsonFiles);

  themeConfigFileContent += `  Global: ${globalConfig[0]},${EOL}`;
  themeConfigFileContent += `  Device: ${deviceConfigs[0]},${EOL}`;
  themeConfigFileContent += `  Brand: ${brandConfigs[0]},${EOL}`;
  themeConfigFileContent += `  Theme: ${themeConfigs[0]},${EOL}`;

  themeConfigFileContent += `};${EOL}${EOL}export default themeConfig;${EOL}`;

  const themeConfigOutputPath = path.join(__dirname, '../../tailwind-figma-config.ts');

  await fs.promises.writeFile(themeConfigOutputPath, themeConfigFileContent);
}

async function writeCssFiles(jsonFiles: { [key: string]: any }) {
  const directory = path.join(__dirname, `../../src/assets/themes`);
  // Clear out the directory
  await fs.promises.rm(directory, { recursive: true, force: true });

  await fs.promises.mkdir(directory, { recursive: true });

  let indexFileContent = '';

  const globalKeys = Object.keys(jsonFiles).filter((key) => key.startsWith('Global'));
  const deviceKeys = Object.keys(jsonFiles).filter((key) => key.startsWith('Device'));
  const brandKeys = Object.keys(jsonFiles).filter((key) => key.startsWith('Brand'));
  const themeKeys = Object.keys(jsonFiles).filter((key) => key.startsWith('Theme'));

  for (let i = 0; i < globalKeys.length; i++) {
    const key = globalKeys[i];
    indexFileContent = await writeCssFile(jsonFiles, key, indexFileContent);
  }
  for (let i = 0; i < deviceKeys.length; i++) {
    const key = deviceKeys[i];
    indexFileContent = await writeCssFile(jsonFiles, key, indexFileContent);
  }
  for (let i = 0; i < brandKeys.length; i++) {
    const key = brandKeys[i];
    // Only generate the css file if the site name is in the key or if the GENERATE_ALL_THEME_TOKENS environment variable is set to true
    if (
      process.env.GENERATE_ALL_THEME_TOKENS === 'true' ||
      key.includes(
        process.env.NEXT_PUBLIC_DEFAULT_SITE_NAME || process.env.SITECORE_SITE_NAME || ''
      )
    ) {
      indexFileContent = await writeCssFile(jsonFiles, key, indexFileContent);
    }
  }
  for (let i = 0; i < themeKeys.length; i++) {
    const key = themeKeys[i];
    indexFileContent = await writeCssFile(jsonFiles, key, indexFileContent);
  }

  const outputPath = path.join(directory, `index.css`);
  await fs.promises.writeFile(outputPath, indexFileContent);
}

async function writeCssFile(
  jsonFiles: { [key: string]: any },
  key: string,
  indexFileContent: string
) {
  if (Object.prototype.hasOwnProperty.call(jsonFiles, key)) {
    const element = jsonFiles[key];

    const flattened = flattenObjectToFigmaTokens(element);

    const parsed = Object.keys(flattened).reduce(
      (acc, key) => {
        const value = flattened[key];
        const sanitizedKey = sanitizeKeyName(key);
        const parsedValue = parseValue(value, key);
        if (parsedValue !== null) {
          acc[sanitizedKey] = parsedValue;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    let fileContent: string;
    let extraClosingBrace = false;
    if (key.startsWith('Global')) {
      fileContent = `.brand-root {${EOL}`;
    } else if (key.startsWith('Device')) {
      const minWidth = parsed['screen-dimensions-min-width'];
      if (key === 'DeviceDesktop') {
        fileContent = `@media (min-width: ${minWidth}) {
  .brand-root {${EOL}`;
      } else {
        const maxWidth = parsed['screen-dimensions-max-width'];
        fileContent = `@media (min-width: ${minWidth}) and (max-width: ${maxWidth}) {
  .brand-root {${EOL}`;
      }
      extraClosingBrace = true;
    } else {
      fileContent = `.${key} {${EOL}`;
    }

    Object.keys(parsed).forEach((key) => {
      const value = parsed[key];
      if (value !== null) {
        fileContent += `  --${key}: ${value};${EOL}`;
      } else {
        fileContent += `/*  --${key}: ${value}; */${EOL}`;
      }
    });
    if (extraClosingBrace) {
      fileContent += `  }${EOL}`;
    }
    fileContent += `}${EOL}`;

    const directory = path.join(__dirname, `../../src/assets/themes`);
    const outputPath = path.join(directory, `_${key}.css`);

    await fs.promises.mkdir(directory, { recursive: true });
    await fs.promises.writeFile(outputPath, fileContent);

    indexFileContent += `@import url('./_${key}');${EOL}`;
    console.log(
      `${EOL}\x1b[32;5;1m  :white_check_mark: A CSS configuration file has been generated and written to\x1b[33m ${outputPath}\x1b[0m ${EOL}`
    );
  }
  return indexFileContent;
}

async function writeTsFiles(jsonFiles: { [key: string]: any }) {
  const directory = path.join(__dirname, `../../src/lib/themes`);
  // Clear out the directory
  await fs.promises.rm(directory, { recursive: true, force: true });
  const brands: string[] = [];
  const themes: string[] = [];
  const globals: string[] = [];

  // Sort the keys to ensure a consistent order
  const keys = Object.keys(jsonFiles);
  keys.sort((a, b) => a.localeCompare(b));
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(jsonFiles, key)) {
      if (key.startsWith('Brand')) {
        brands.push(key);
      } else if (key.startsWith('Theme')) {
        themes.push(key);
      } else if (key.startsWith('Global')) {
        globals.push(key);
      }
      const element = jsonFiles[key];
      let fileContent = `/* prettier-ignore */
export const ${key} = {${EOL}`;
      const flattened = flattenObjectToFigmaTokens(element);
      Object.keys(flattened).forEach((key) => {
        const value = flattened[key];
        const sanitizedKey = sanitizeKeyName(key);

        const parsedValue = parseValue(value, key)?.replace(/'/g, "\\'") ?? null;

        if (parsedValue !== null) {
          fileContent += `  '${sanitizedKey}': '${parsedValue}',${EOL}`;
        } else {
          fileContent += `/*  '${sanitizedKey}': '${parsedValue}', */${EOL}`;
        }
      });
      fileContent += `};${EOL}`;

      const outputPath = path.join(directory, `_${key}.ts`);

      await fs.promises.mkdir(directory, { recursive: true });
      await fs.promises.writeFile(outputPath, fileContent);
      console.log(
        `${EOL}\x1b[32;5;1m  :white_check_mark: A TS configuration file has been generated and written to\x1b[33m ${outputPath}\x1b[0m ${EOL}`
      );
    }
  }

  await writeTsIndexFile(brands, themes, globals, directory);
}

async function writeTsIndexFile(
  brands: string[],
  themes: string[],
  globals: string[],
  directory: string
) {
  let indexFileContent = `/* prettier-ignore */${EOL}`;
  brands.forEach((brand) => {
    indexFileContent += `import { ${brand} } from './_${brand}';${EOL}`;
  });

  indexFileContent += EOL;

  themes.forEach((theme) => {
    indexFileContent += `import { ${theme} } from './_${theme}';${EOL}`;
  });

  indexFileContent += EOL;

  globals.forEach((global) => {
    indexFileContent += `import { ${global} } from './_${global}';${EOL}`;
  });

  indexFileContent += EOL;

  indexFileContent += `export type BrandType = typeof ${brands[0]};${EOL}`;
  indexFileContent += `export type ThemeType = typeof ${themes[0]};${EOL}`;
  indexFileContent += `export type GlobalType = typeof ${globals[0]};${EOL}`;

  indexFileContent += EOL;

  indexFileContent += `export const brandMap = {${EOL}`;
  brands.forEach((brand) => {
    indexFileContent += `  ${brand}: ${brand},${EOL}`;
  });
  indexFileContent += `};${EOL}`;

  indexFileContent += EOL;

  indexFileContent += `export const themeMap = {${EOL}`;
  themes.forEach((theme) => {
    indexFileContent += `  ${theme}: ${theme},${EOL}`;
  });
  indexFileContent += `};${EOL}`;

  indexFileContent += EOL;

  indexFileContent += `export const globalMap = {${EOL}`;
  globals.forEach((global) => {
    indexFileContent += `  ${global}: ${global},${EOL}`;
  });
  indexFileContent += `};${EOL}`;

  const outputPath = path.join(directory, `index.ts`);

  await fs.promises.mkdir(directory, { recursive: true });
  await fs.promises.writeFile(outputPath, indexFileContent);
}

function flattenObjectToFigmaTokens(obj: any): FigmaTokenMap {
  const flattened: FigmaTokenMap = {};

  // Sort the keys to ensure a consistent order
  const keys = Object.keys(obj);
  keys.sort((a, b) => a.localeCompare(b));
  keys.forEach((key) => {
    const value = obj[key];
    const sanitizedKey = sanitizeKeyName(key);

    if (typeof value === 'object' && value !== null) {
      // An object can be both a token, as well as have nested tokens
      // Get the top level token
      const topLevelToken: ExtendedFigmaToken = {
        $type: value.$type,
        $value: value.$value,
        resolvedType: value.resolvedType,
        $extensions: value.$extensions,
        $description: value.$description,
      };

      // Get the nested tokens
      const nestedTokens: Record<string, any> = {};
      // All the fields without a $ prefix are nested tokens
      for (const prop of Object.keys(value).filter(
        (key) => !Object.keys(topLevelToken).includes(key)
      )) {
        nestedTokens[prop] = value[prop];
      }

      // Add the top level token to the flattened object
      if (value.$type) {
        flattened[sanitizedKey] = topLevelToken;
      }

      // Add the nested tokens to the flattened object
      const flattenedChild = flattenObjectToFigmaTokens(nestedTokens);
      Object.keys(flattenedChild).forEach((childKey) => {
        flattened[`${sanitizedKey}-${childKey}`] = flattenedChild[childKey];
      });
    }
  });

  return flattened;
}

/*
 * Recursive function to transform nested objects
 * If the item is an object, recursively process it
 * If it contains $value and $type, process the item
 * Check if $extentions.com.figma.codeSyntax.WEB is defined
 * Sanitize key name, and only add the parent prefix if codeSyntaxWeb exists
 */
function filterDataObjects(obj: FigmaTokenMap) {
  // const result: { [key: string]: any } = {};
  const colorResults: { [key: string]: any } = {};
  const opacityResults: { [key: string]: any } = {};
  const spacingResults: { [key: string]: any } = {};
  const borderRadiusResults: { [key: string]: any } = {};
  const borderWidthResults: { [key: string]: any } = {};
  const widthResults: { [key: string]: any } = {};
  const heightResults: { [key: string]: any } = {};
  const minWidthResults: { [key: string]: any } = {};
  const maxWidthResults: { [key: string]: any } = {};
  const minHeightResults: { [key: string]: any } = {};
  const maxHeightResults: { [key: string]: any } = {};
  const fontSizeResults: { [key: string]: any } = {};
  const fontFamilyResults: { [key: string]: any } = {};
  const fontWeightResults: { [key: string]: any } = {};
  const letterSpacingResults: { [key: string]: any } = {};
  const backdropBlurResults: { [key: string]: any } = {};
  const blurResults: { [key: string]: any } = {};

  resolveTokenType(obj);

  for (const key in obj) {
    const item = obj[key];

    const value = `var(--${sanitizeKeyName(key)})`;

    const variableType = getVariableType(item, key, false);

    if (variableType === 'IGNORED') {
      continue;
    }
    if (variableType === 'color') {
      colorResults[key] = value;
    } else if (variableType === 'opacity') {
      opacityResults[key] = value;
    } else if (variableType === 'spacing') {
      spacingResults[key] = value;
    } else if (variableType === 'border-radius') {
      borderRadiusResults[key] = value;
    } else if (variableType === 'border-width') {
      borderWidthResults[key] = value;
    } else if (variableType === 'width') {
      widthResults[key] = value;
    } else if (variableType === 'height') {
      heightResults[key] = value;
    } else if (variableType === 'min-width') {
      minWidthResults[key] = value;
    } else if (variableType === 'max-width') {
      maxWidthResults[key] = value;
    } else if (variableType === 'min-height') {
      minHeightResults[key] = value;
    } else if (variableType === 'max-height') {
      maxHeightResults[key] = value;
    } else if (variableType === 'font-size') {
      fontSizeResults[key] = value;
    } else if (variableType === 'font-family') {
      fontFamilyResults[key] = value;
    } else if (variableType === 'font-weight') {
      fontWeightResults[key] = value;
    } else if (variableType === 'letter-spacing') {
      letterSpacingResults[key] = value;
    } else if (variableType === 'backdrop-blur') {
      backdropBlurResults[key] = value;
    } else if (variableType === 'blur') {
      blurResults[key] = value;
    } else {
      throw new Error(`Unknown variable type: ${variableType}: ${value}`);
    }
  }

  return {
    colors: colorResults,
    opacity: opacityResults,
    spacing: spacingResults,
    borderRadius: borderRadiusResults,
    borderWidth: borderWidthResults,
    width: widthResults,
    height: heightResults,
    minWidth: minWidthResults,
    maxWidth: maxWidthResults,
    minHeight: minHeightResults,
    maxHeight: maxHeightResults,
    fontSize: fontSizeResults,
    fontFamily: fontFamilyResults,
    fontWeight: fontWeightResults,
    letterSpacing: letterSpacingResults,
    backdropBlur: backdropBlurResults,
    blur: blurResults,
  };
}

function splitJsonFileConfigs(jsonFiles: { [key: string]: any }) {
  const globalKeys = Object.keys(jsonFiles).filter((key) => key.startsWith('Global'));
  const deviceKeys = Object.keys(jsonFiles).filter((key) => key.startsWith('Device'));
  const brandKeys = Object.keys(jsonFiles).filter((key) => key.startsWith('Brand'));
  const themeKeys = Object.keys(jsonFiles).filter((key) => key.startsWith('Theme'));

  if (globalKeys.length > 1) {
    throw new Error('Only one Global key is allowed');
  }

  const getJson = (key: string): string => {
    const value = jsonFiles[key];
    const flattened = flattenObjectToFigmaTokens(value);
    const result = filterDataObjects(flattened);
    const formattedValue = JSON.stringify(result, null, 2).replace(/"(\w+)":\s+/g, '  $1: ');
    return formattedValue;
  };

  const globalConfig = globalKeys.map(getJson);

  const deviceConfigs = deviceKeys.map(getJson);

  deviceConfigs.forEach((config) => {
    if (config !== deviceConfigs[0]) {
      throw new Error('Device configs must be the same');
    }
  });

  const brandConfigs = brandKeys.map(getJson);

  brandConfigs.forEach((config) => {
    if (config !== brandConfigs[0]) {
      throw new Error('Brand configs must be the same');
    }
  });

  const themeConfigs = themeKeys.map(getJson);

  themeConfigs.forEach((config) => {
    if (config !== themeConfigs[0]) {
      throw new Error('Theme configs must be the same');
    }
  });
  return { globalConfig, deviceConfigs, brandConfigs, themeConfigs };
}
