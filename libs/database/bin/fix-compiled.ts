// In /scripts/remove-ts-extension.mjs
import { glob } from 'glob';
import fs from 'fs/promises';

const targetDir = process.argv[2];
if (!targetDir) {
  console.error('Error: Please provide the directory path.');
  process.exit(1);
}

async function run() {
  const files = await glob(`${targetDir}/**/*.{js,mjs}`);
  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    // This regex finds an import/require paths ending in .ts and removes it
    const newContent = content.replace(/(from |require\()(['"])(.*?)(\.ts)(['"])/g, '$1$2$3$5');

    if (content !== newContent) {
      console.log(`Fixing imports in ${file}...`);
      await fs.writeFile(file, newContent, 'utf-8');
    }
  }
  console.log('Finished fixing imports.');
}

run();
