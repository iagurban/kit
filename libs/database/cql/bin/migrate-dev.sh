#!/bin/bash

# Development script:
# 1. Applies existing migrations to the dev database.
# 2. Compares the schema with the canonical snapshot (cql/schema/main.cql).
# 3. If differences are found, creates a new migration file.
# 4. Applies the newly created migration.
# 5. Updates the canonical schema snapshot.

set -e

: "${SCYLLA_CONTACT_POINTS?Variable SCYLLA_CONTACT_POINTS is not set in .env}"
: "${SCYLLA_KEYSPACE?Variable SCYLLA_KEYSPACE is not set in .env}"

# --- Configuration ---
FLYWAY_CMD="flyway"
FLYWAY_URL="jdbc:cassandra://${SCYLLA_CONTACT_POINTS}/${SCYLLA_KEYSPACE}"
MIGRATIONS_DIR="$(dirname "$0")/./cql/migrations"
SCHEMA_DIR="$(dirname "$0")/./cql/schema"
CANONICAL_SCHEMA_FILE="$SCHEMA_DIR/main.cql"
TEMP_SCHEMA_FILE="$SCHEMA_DIR/dev_current.cql"

# --- STEP 1: Apply pending migrations ---
echo "1/5: Synchronizing the dev database. Applying pending migrations..."
$FLYWAY_CMD -url="$FLYWAY_URL" -locations="filesystem:$MIGRATIONS_DIR" migrate

# --- STEP 2: Create a schema diff ---
echo "2/5: Comparing the current schema with the canonical snapshot..."
# Get the current schema from the dev database
cqlsh "${SCYLLA_CONTACT_POINTS/:*/}" -e "DESCRIBE SCHEMA" > "$TEMP_SCHEMA_FILE"

# Compare the canonical schema with the current state and extract new lines
MIGRATION_CQL=$(diff -U0 "$CANONICAL_SCHEMA_FILE" "$TEMP_SCHEMA_FILE" | grep '^+' | cut -c2-)

# Check if there are any changes
if [ -z "$MIGRATION_CQL" ]; then
  echo "The database schema is up-to-date. No new migration is needed."
  rm "$TEMP_SCHEMA_FILE"
  exit 0
fi

echo "Detected the following schema changes:"
echo "----------------------------------------------------"
echo "$MIGRATION_CQL"
echo "----------------------------------------------------"

# --- STEP 3: Create a new migration file ---
echo "3/5: Creating a new migration file..."
read -p "Enter a name for the new migration (e.g., add_email_to_users): " migration_name

# Sanitize the migration name
migration_name=$(echo "$migration_name" | tr ' ' '_' | sed 's/[^a-zA-Z0-9_]//g')
timestamp=$(date +'%Y%m%d%H%M%S')
new_migration_file="$MIGRATIONS_DIR/V${timestamp}__${migration_name}.cql"

echo "$MIGRATION_CQL" > "$new_migration_file"
echo "Created migration file: $new_migration_file"

# --- STEP 4: Apply the new migration ---
echo "4/5: Applying the newly created migration..."
$FLYWAY_CMD -url="$FLYWAY_URL" -locations="filesystem:$MIGRATIONS_DIR" migrate

# --- STEP 5: Update the canonical schema snapshot ---
echo "5/5: Updating the canonical schema snapshot (cql/schema/main.cql)..."
mv "$TEMP_SCHEMA_FILE" "$CANONICAL_SCHEMA_FILE"

echo "======================================================"
echo "  Done! Remember to commit the following files:"
echo "  1. The new migration file: $new_migration_file"
echo "  2. The updated snapshot: $CANONICAL_SCHEMA_FILE"
echo "======================================================"
