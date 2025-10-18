#!/bin/bash
# Production-ready script: safely applies existing migrations.
# Environment variables are expected to be provided by the execution environment (e.g., Nx, CI/CD).

set -e

# Check for required variables (they should be in the environment now)
: "${SCYLLA_CONTACT_POINTS?Variable SCYLLA_CONTACT_POINTS is not set}"
: "${SCYLLA_KEYSPACE?Variable SCYLLA_KEYSPACE is not set}"

# --- Flyway Configuration ---
FLYWAY_CMD="flyway"
FLYWAY_URL="jdbc:cassandra://${SCYLLA_CONTACT_POINTS}/${SCYLLA_KEYSPACE}"
MIGRATIONS_LOCATION="filesystem:./cql/migrations" # Path relative to workspace root

# --- Execute Migrations ---
echo "====================================================="
echo "Applying migrations to the database:"
echo "Host(s): $SCYLLA_CONTACT_POINTS"
echo "Keyspace: $SCYLLA_KEYSPACE"
echo "====================================================="

$FLYWAY_CMD -url="$FLYWAY_URL" \
           -locations="$MIGRATIONS_LOCATION" \
           migrate

echo "Migrations applied successfully."
