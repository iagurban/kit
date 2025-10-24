import { promises as fs } from 'fs';
import { glob } from 'glob';
import path from 'path';

// --- Configuration ---
const PREPEND_TEXT = '/* eslint-disable @typescript-eslint/no-explicit-any */';

const REPLACEMENTS: { from: string; to: string }[] = [
  {
    from: "import { gql } from '@apollo/client';",
    to: "import { gql } from '@apollo/client/core';",
  },
  {
    from: "import * as Apollo from '@apollo/client';",
    to: "import * as Apollo from '@apollo/client/react';",
  },
];
// --------------------

async function updateFileContent(filePath: string): Promise<void> {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    let wasModified = false;

    // 1. Prepend text if it's not already there
    if (!content.startsWith(PREPEND_TEXT)) {
      content = `${PREPEND_TEXT}\n${content}`;
      wasModified = true;
    }

    // 2. Perform all replacements
    for (const replacement of REPLACEMENTS) {
      // Use a global regex to replace all occurrences
      const regex = new RegExp(replacement.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (content.match(regex)) {
        content = content.replace(regex, replacement.to);
        wasModified = true;
      }
    }

    // 3. Write changes back to the file only if it was modified
    if (wasModified) {
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`⚪️ No changes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing file ${filePath}:`, error);
  }
}

async function main() {
  const pattern = process.argv[2];

  if (!pattern) {
    console.error('❌ Error: Please provide a file glob pattern as an argument.');
    console.log('\nUsage: npx ts-node update-files.ts "src/**/*.ts"');
    process.exit(1);
  }

  console.log(`🔍 Finding files matching pattern: ${pattern}`);
  const files = await glob(pattern, { nodir: true, ignore: 'node_modules/**' });

  if (files.length === 0) {
    console.log('🤷 No files found.');
    return;
  }

  console.log(`Found ${files.length} files. Starting update process...\n`);

  const updatePromises = files.map(file => updateFileContent(path.resolve(file)));
  await Promise.all(updatePromises);

  console.log('\n🎉 Script finished!');
}

main().catch(error => {
  console.error('An unexpected error occurred:', error);
  process.exit(1);
});
