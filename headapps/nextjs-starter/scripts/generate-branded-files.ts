/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Import dependencies
 */
import fs from 'fs';
import path from 'path';

const directoryPath = path.resolve(__dirname, '../src/');

const SiteName = process.env.NEXT_PUBLIC_DEFAULT_SITE_NAME ?? process.env.SITECORE_SITE_NAME;

async function generateBrandedFiles() {
  try {
    const files = (
      await fs.promises.readdir(directoryPath, { withFileTypes: true, recursive: true })
    ).filter((file) => file.isFile());

    const generatedFiles = files.filter((file) => file.name.includes(`brand.generated.ts`));
    for (const file of generatedFiles) {
      const parentPath = file.parentPath ?? file.path;
      const filePath = path.join(parentPath, file.name);
      console.log(`removing ${filePath}`);
      await fs.promises.rm(filePath);
    }

    const defaultFiles = files.filter((file) => file.name.includes(`brand.default`));

    const siteNameOrAll = process.env.GENERATE_ALL_THEME_TOKENS === 'true' ? 'all' : SiteName;
    // We either want all or the site name
    const brandStringRegex = new RegExp(`brand(\..+)?\.${siteNameOrAll}(\..+)*\.ts`);
    const brandFiles = files.filter((file) => brandStringRegex.test(file.name));

    for (const file of defaultFiles) {
      const parentPath = file.parentPath ?? file.path;
      const filePath = path.join(parentPath, file.name);

      const newFilePath = path.join(
        parentPath,
        file.name.replace('brand.default', 'brand.generated')
      );
      console.log(`copying from ${filePath} to ${newFilePath}`);
      await fs.promises.copyFile(filePath, newFilePath);
    }
    for (const file of brandFiles) {
      const parentPath = file.parentPath ?? file.path;
      const filePath = path.join(parentPath, file.name);
      const newFilePath = path.join(
        parentPath,
        file.name.replace(brandStringRegex, 'brand.generated.ts')
      );
      console.log(`copying from ${filePath} to ${newFilePath}`);
      await fs.promises.copyFile(filePath, newFilePath);
    }
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error generating output file:', error);
  }
}

generateBrandedFiles();
