import { Client } from 'cassandra-driver';
import { crc32 } from 'crc'; // Import from the 'crc' package instead of 'crypto'
import fs from 'fs/promises';
import path from 'path';

/**
 * Calculates the CRC32 checksum of a file's content using the 'crc' library.
 * @param content The file content as a Buffer.
 * @returns A signed 32-bit integer representing the checksum.
 */
const calculateCrc32 = (content: Buffer): number => {
  // The crc32 function returns an unsigned 32-bit integer.
  const unsignedCrc = crc32(content);
  // We use a bitwise OR to convert it to a signed 32-bit integer,
  // which matches the `int` type in ScyllaDB/Cassandra.
  return unsignedCrc | 0;
};

// --- Configuration ---
const configPath = path.resolve(__dirname, '../../.cql-migrate.json');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const config: CqlMigrateConfig = require(configPath);
const MIGRATIONS_DIR = path.resolve(path.dirname(configPath), config.migrations.dir);
const VERSION_PREFIX = config.migrations.prefix ?? '';

// --- Type Definitions ---
interface CqlMigrateConfig {
  scylla: {
    contactPoints: string[];
    localDataCenter: string;
    keyspace: string;
  };
  migrations: {
    dir: string;
    prefix?: string;
  };
}
type VersionPart = number | string;
type ParsedVersion = VersionPart[];

// =======================================================================
// HELPER FUNCTIONS
// =======================================================================
/**
 * Parses a migration filename into a comparable version array.
 * It handles an optional prefix (like "V") and stops at "__".
 * Example: "V1.2.0-alpha__add_users.cql" -> [1, 2, 0, "alpha"]
 * @param filename The filename to parse.
 * @returns An array of numbers and strings representing the version.
 */
const parseVersion = (filename: string): ParsedVersion => {
  const regex = new RegExp(`^(${VERSION_PREFIX})?([\\d.-]+)__`);
  const match = filename.match(regex);

  if (!match || !match[2]) {
    // Return an empty array if the format is invalid
    return [];
  }

  const versionString = match[2];

  // Split by '.' for major/minor/patch, then by '-' for pre-release tags
  return versionString.split('.').flatMap(part =>
    part.split('-').map(subPart => {
      const num = parseInt(subPart, 10);
      return isNaN(num) ? subPart : num;
    })
  );
};

/**
 * Compares two parsed versions for sorting according to semver-like rules.
 * @param vA The first parsed version array.
 * @param vB The second parsed version array.
 * @returns A negative, zero, or positive number for sorting.
 */
const compareVersions = (vA: ParsedVersion, vB: ParsedVersion): number => {
  const maxLength = Math.max(vA.length, vB.length);
  for (let i = 0; i < maxLength; i++) {
    const partA = vA[i];
    const partB = vB[i];

    // Shorter versions come first (e.g., 1.2.0 comes after 1.2.0-alpha)
    if (partA === undefined) {
      return -1;
    }
    if (partB === undefined) {
      return 1;
    }

    const aIsNum = typeof partA === 'number';
    const bIsNum = typeof partB === 'number';

    if (aIsNum && bIsNum) {
      if (partA !== partB) {
        return partA - partB;
      }
      continue;
    }

    // Pre-release tags (strings) come before final versions (numbers)
    if (aIsNum && !bIsNum) {
      return 1;
    } // A is number, B is string -> B comes first
    if (!aIsNum && bIsNum) {
      return -1;
    } // A is string, B is number -> A comes first

    // Both are strings, compare them alphabetically
    if (partA !== partB) {
      return String(partA).localeCompare(String(partB));
    }
  }

  return 0; // Versions are identical
};

/**
 * Encapsulates the logic of connecting and shutting down the database client.
 * @param fn The function to execute with the connected client.
 */
async function withClient<T>(fn: (client: Client) => Promise<T>): Promise<T> {
  const client = new Client({
    contactPoints: config.scylla.contactPoints,
    localDataCenter: config.scylla.localDataCenter,
    keyspace: config.scylla.keyspace,
  });
  try {
    console.log('Connecting to ScyllaDB...');
    await client.connect();
    console.log('Connected.');
    return await fn(client);
  } finally {
    if (client) {
      await client.shutdown();
      console.log('Connection closed.');
    }
  }
}

/**
 * A robust CQL script parser that correctly handles semicolons in strings and comments.
 * This function has no external dependencies.
 * @param cql The full CQL script as a string.
 * @returns An array of individual, executable statements.
 */
function splitCqlToStatements(cql: string): string[] {
  const statements: string[] = [];
  let currentStatement = '';
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let inSingleLineComment = false;
  let inMultiLineComment = false;

  for (let i = 0; i < cql.length; i++) {
    const char = cql[i];
    const nextChar = i + 1 < cql.length ? cql[i + 1] : null;

    // Handle exiting comments
    if (inSingleLineComment) {
      if (char === '\n') {
        inSingleLineComment = false;
      }
      continue;
    }
    if (inMultiLineComment) {
      if (char === '*' && nextChar === '/') {
        inMultiLineComment = false;
        i++; // Also skip the closing '/'
      }
      continue;
    }

    // Handle entering comments
    if (char === '-' && nextChar === '-') {
      inSingleLineComment = true;
      i++; // Skip the second '-'
      continue;
    }
    if (char === '/' && nextChar === '*') {
      inMultiLineComment = true;
      i++; // Skip the '*'
      continue;
    }

    // Handle strings
    if (char === "'") {
      // Handle escaped single quotes inside a string (e.g., 'O''Malley')
      if (inSingleQuote && nextChar === "'") {
        currentStatement += "''";
        i++;
        continue;
      }
      inSingleQuote = !inSingleQuote;
    }
    if (char === '"') {
      inDoubleQuote = !inDoubleQuote;
    }

    currentStatement += char;

    // Handle statement delimiter
    if (char === ';' && !inSingleQuote && !inDoubleQuote) {
      const trimmed = currentStatement.trim();
      if (trimmed) {
        statements.push(trimmed);
      }
      currentStatement = '';
    }
  }

  // Add the last statement if the file doesn't end with a semicolon
  const lastTrimmed = currentStatement.trim();
  if (lastTrimmed) {
    statements.push(lastTrimmed);
  }

  return statements;
}

/**
 * Verifies the integrity and order of already-applied migrations.
 */
async function checkAppliedMigrations(
  client: Client,
  localFiles: string[],
  appliedMap: Map<string, number | null>
) {
  console.log('Verifying order and checksums of applied migrations...');
  const sortedAppliedVersions = Array.from(appliedMap.keys()).sort((a, b) =>
    compareVersions(parseVersion(a), parseVersion(b))
  );

  for (let i = 0; i < sortedAppliedVersions.length; i++) {
    const appliedVersion = sortedAppliedVersions[i];
    const localFileVersion = localFiles[i];

    if (appliedVersion !== localFileVersion) {
      throw new Error(
        `Migration history mismatch! Applied migration "${appliedVersion}" does not match local file order at position ${i + 1} ("${localFileVersion}").`
      );
    }

    const storedCrc = appliedMap.get(appliedVersion);
    if (storedCrc) {
      const fileContent = await fs.readFile(path.join(MIGRATIONS_DIR, appliedVersion));
      const calculatedCrc = calculateCrc32(fileContent);
      if (calculatedCrc !== storedCrc) {
        throw new Error(
          `Checksum mismatch for applied migration "${appliedVersion}": DB has ${storedCrc}, file has ${calculatedCrc}.`
        );
      }
    }
  }
  console.log('All applied migrations are consistent and correct.');
}

/**
 * Executes a list of pending migration files.
 */
async function applyPendingMigrations(client: Client, pendingFiles: string[]) {
  console.log('Applying pending migrations:', pendingFiles);
  for (const fileName of pendingFiles) {
    const filePath = path.join(MIGRATIONS_DIR, fileName);
    const fileContentBuffer = await fs.readFile(filePath);
    const calculatedCrc = calculateCrc32(fileContentBuffer);
    const cqlScript = fileContentBuffer.toString('utf-8');

    const statements = splitCqlToStatements(cqlScript);

    for (const statement of statements) {
      await client.execute(statement);
    }

    await client.execute(
      'INSERT INTO schema_migrations (version, applied_at, crc) VALUES (?, ?, ?)',
      [fileName, new Date(), calculatedCrc],
      { prepare: true }
    );
    console.log(`Successfully applied and recorded ${fileName}.`);
  }
}

// =======================================================================
// MAIN MIGRATION LOGIC
// =======================================================================

async function runMigrations() {
  await withClient(async client => {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version text PRIMARY KEY,
        applied_at timestamp,
        crc int
      )
    `);

    const dbResult = await client.execute('SELECT version, crc FROM schema_migrations');
    const appliedMigrations = new Map<string, number | null>(dbResult.rows.map(r => [r.version, r.crc]));

    const localMigrationFiles = (await fs.readdir(MIGRATIONS_DIR))
      .filter(file => file.endsWith('.cql'))
      .sort((a, b) => compareVersions(parseVersion(a), parseVersion(b)));

    await checkAppliedMigrations(client, localMigrationFiles, appliedMigrations);

    const pendingMigrationFiles = localMigrationFiles.slice(appliedMigrations.size);

    if (pendingMigrationFiles.length === 0) {
      console.log('Database is up-to-date.');
      return;
    }

    await applyPendingMigrations(client, pendingMigrationFiles);
  }).catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
}

/**
 * Finds the latest (highest version) migration file in the directory.
 * @returns The filename of the latest migration, or null if the directory is empty.
 */
async function findLatestVersion(): Promise<string | null> {
  const localMigrationFiles = (await fs.readdir(MIGRATIONS_DIR))
    .filter(file => file.endsWith('.cql'))
    .sort((a, b) => compareVersions(parseVersion(a), parseVersion(b)));

  return localMigrationFiles.pop() || null;
}

/**
 * Creates a new, empty migration file based on the latest version.
 */
async function createMigration(description: string) {
  if (!description) {
    console.error('Error: Please provide a description for the migration.');
    process.exit(1);
  }

  const latestVersionFile = await findLatestVersion();
  let newVersionPrefix: string;

  if (latestVersionFile) {
    // If migrations exist, create the new version based on the latest one.
    const latestVersion = latestVersionFile.split('__')[0];
    newVersionPrefix = `${latestVersion}-new`;
  } else {
    // If this is the very first migration.
    newVersionPrefix = '1.0.0';
  }

  const fileName = `${VERSION_PREFIX}${newVersionPrefix}__${description}.cql`;
  const filePath = path.join(MIGRATIONS_DIR, fileName);

  await fs.writeFile(filePath, '-- Add your CQL statements here;\n');

  console.log(`Created migration: ${filePath}`);
  console.log(`Please review and edit the version prefix "${newVersionPrefix}" if needed.`);
}

// =======================================================================
// COMMAND DISPATCHER
// =======================================================================

// The first two arguments are 'node' and the script path, so we start at index 2.
const command = process.argv[2];
const argument = process.argv[3];

/**
 * Main entry point that routes to the correct function based on the command.
 */
async function main() {
  switch (command) {
    case 'create':
      await createMigration(argument);
      break;

    // For now, 'status' runs the full check without applying new migrations.
    // We can add a dedicated status function later if needed.
    case 'status':
    case 'up':
    case undefined: // Default to 'up' if no command is provided
      await runMigrations();
      break;

    default:
      console.error(`Error: Unknown command "${command}"`);
      console.error('Available commands: up, status, create');
      process.exit(1);
  }
}

// Execute the main function.
main().catch(err => {
  console.error('An unexpected error occurred in the dispatcher:', err);
  process.exit(1);
});
