/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';
import * as fs from 'fs';
import FigmaApi from './figma_api';
import { green } from './utils';
import { getTokenNameMapForDiff, tokenFilesFromLocalVariables } from './token_export';
import { red } from 'chalk';

/**
 * Usage:
 *
 * // Defaults to writing to the tokens_new directory
 * npm run sync-figma-to-tokens
 *
 * // Writes to the specified directory
 * npm run sync-figma-to-tokens -- --output directory_name
 */

async function main() {
  if (!process.env.PERSONAL_ACCESS_TOKEN || !process.env.FILE_KEY) {
    throw new Error('PERSONAL_ACCESS_TOKEN and FILE_KEY environemnt variables are required');
  }
  const fileKey = process.env.FILE_KEY;

  const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN);
  const localVariables = await api.getLocalVariables(fileKey);

  let outputDir = 'scripts/figma-tokens/tokens';
  const outputArgIdx = process.argv.indexOf('--output');
  if (outputArgIdx !== -1) {
    outputDir = process.argv[outputArgIdx + 1];
  }

  const flatTokens = getTokenNameMapForDiff(localVariables);
  const diffTokens: DiffTokens = {
    deletedTokens: [],
    renamedTokens: [],
  };

  Object.entries(flatTokens).forEach(([fileName, fileContent]) => {
    const oldTokensString = fs.readFileSync(`${outputDir}/diff/${fileName}`, 'utf8');
    const oldTokens = JSON.parse(oldTokensString);

    Object.keys(oldTokens).forEach((tokenName) => {
      if (!fileContent[tokenName]) {
        diffTokens.deletedTokens.push(oldTokens[tokenName]);
      } else if (fileContent[tokenName] !== oldTokens[tokenName]) {
        diffTokens.renamedTokens.push({
          old: oldTokens[tokenName],
          new: fileContent[tokenName],
        });
      }
    });
  });

  // Clear out the output directory
  fs.rmSync(outputDir, { recursive: true, force: true });

  // Recreate the output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
    fs.mkdirSync(`${outputDir}/diff`);
    fs.mkdirSync(`${outputDir}/temp`);
  }

  const tokensFiles = tokenFilesFromLocalVariables(localVariables);
  Object.entries(tokensFiles).forEach(([fileName, fileContent]) => {
    fs.writeFileSync(`${outputDir}/${fileName}`, JSON.stringify(fileContent, null, 2));
    console.log(`Wrote ${fileName}`);
  });

  Object.entries(flatTokens).forEach(([fileName, fileContent]) => {
    fs.writeFileSync(`${outputDir}/diff/${fileName}`, JSON.stringify(fileContent, null, 2));
    console.log(`Wrote ${fileName}`);
  });

  updatedFilesWithChangedTokens(diffTokens);

  console.log(green(`✅ Tokens files have been written to the ${outputDir} directory`));
}

/**
 * Updates all code files with the changed tokens
 * @param diffTokens - The diff tokens
 */
async function updatedFilesWithChangedTokens(diffTokens: DiffTokens) {
  const files = fs.promises.glob(`src/**/*.{css,scss,tsx,ts,js,jsx,json,html}`);

  // Prevents duplicate files
  const uniqueFiles = new Set<string>();
  for await (const file of files) {
    // Skip files because they will be regenerated separately
    if (
      file.includes('src/assets/themes') ||
      file.includes('src\\assets\\themes') ||
      file.includes('src/lib/themes') ||
      file.includes('src\\lib\\themes')
    ) {
      continue;
    }
    uniqueFiles.add(file);
  }

  // Sort files by length to ensure we update the longest files first
  // This avoids issues where one token is a substring of another token
  const sortedFiles = Array.from(uniqueFiles).sort((a, b) => b.length - a.length);

  for (const file of sortedFiles) {
    // We need to do this synchronously because we saw issues with the async version
    // where file would come back empty
    let fileContent = fs.readFileSync(file, 'utf8');

    // Sometimes a file can't be read, so we skip it
    if (fileContent.length < 5) {
      console.error(`Could not read file "${file}".  Content: "${fileContent}"`);
      continue;
    }

    let updated = false;

    // Update renamed tokens
    diffTokens.renamedTokens.forEach((renamedToken) => {
      const newfileContent = fileContent.replaceAll(
        `--${renamedToken.old}`,
        `--${renamedToken.new}`
      );
      if (fileContent !== newfileContent) {
        fileContent = newfileContent;
        updated = true;
      }
    });

    // Update deleted tokens with an error
    diffTokens.deletedTokens.forEach((deletedToken) => {
      const affectedFileContent = fileContent.includes(`${deletedToken}`);
      if (affectedFileContent) {
        fileContent = fileContent.replaceAll(
          `${deletedToken}`,
          `${deletedToken}(This token was deleted, please fix before committing)`
        );
        updated = true;
        console.log(red(`❌ ${file} contains a deleted token: ${deletedToken}`));
      }
    });

    // Write the updated file if it was updated
    if (updated) {
      await fs.promises.writeFile(file, fileContent);
      console.log(green(`✅ File contains updated tokens: ${file}`));
    }
  }
}

main();

type DiffTokens = { deletedTokens: string[]; renamedTokens: { old: string; new: string }[] };
