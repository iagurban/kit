#!/bin/bash
# This script creates a new migration file with a stable, sortable prefix.
# It is designed to be run from the `libs/database` directory as its CWD.

set -e

# --- Configuration (paths are now relative to this project's root) ---
MIGRATIONS_DIR="./cql/migrations"
CONFIG_FILE="./cassandra-migrate-config.js"

# --- Get the migration name from the first argument ---
if [ -z "$1" ]; then
  echo "Error: Please provide a name for the migration."
  echo "Usage: nx run database:migrate-cql-create --name=<migration_name>"
  exit 1
fi
migration_name=$1

# --- Step 1: Create the default migration file ---
echo "Creating default migration file for: $migration_name"
# --- THIS LINE IS THE FIX: Using the -o flag for the config file ---
output=$(yarn cassandra-migrate  -o "$CONFIG_FILE" create "$migration_name" -t cql)

full_path_original_file=$(echo "$output" | grep 'Created migration' | awk '{print $3}')
original_filename=$(basename "$full_path_original_file")

if [ -z "$original_filename" ]; then
  echo "Error: Failed to create migration file from cassandra-migrate tool."
  exit 1
fi

# --- Step 2: Generate a new, padded prefix ---
timestamp=$(echo "$original_filename" | cut -d'-' -f1)
new_prefix=$(printf "%019d" "$timestamp")

# --- Step 3: Rename the file ---
new_filename="${new_prefix}-${migration_name}.cql"
mv "$full_path_original_file" "$MIGRATIONS_DIR/$new_filename"

echo "----------------------------------------------------"
echo "Successfully created and renamed migration file:"
echo "$MIGRATIONS_DIR/$new_filename"
echo "----------------------------------------------------"
