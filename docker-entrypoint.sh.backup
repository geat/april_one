#!/bin/sh

echo "================================================"
echo "Docker Entrypoint Script Starting..."
echo "================================================"

# Enable error handling but don't exit on errors
set +e

# Check required environment variables
echo "Checking environment variables..."
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set!"
  exit 1
fi

echo "✓ Environment check passed"
echo "  NODE_ENV: ${NODE_ENV:-not set}"
echo "  DATABASE_URL: ${DATABASE_URL:0:40}..."
echo "  DIRECT_URL: ${DIRECT_URL:0:40}..."

# Run database migrations in background to not block startup
echo ""
echo "================================================"
echo "Starting database preparation in background..."
echo "================================================"

(
  echo "Running database migrations..."
  echo "Using drizzle-kit push for schema synchronization..."

  if npx drizzle-kit push --force --verbose 2>&1; then
    echo "✓ Database schema synchronized successfully"
  else
    echo "⚠️  Migration failed, but continuing..."
  fi

  echo ""
  echo "Running database seed..."

  if npm run db:seed 2>&1; then
    echo "✓ Database seed completed successfully"
  else
    echo "⚠️  Seed failed, but continuing..."
  fi

  echo "✓ Database preparation completed"
) &

# Store the background PID
DB_PREP_PID=$!
echo "Database preparation running in background (PID: $DB_PREP_PID)"
echo "Server will start immediately without waiting..."

echo ""
echo "================================================"
echo "Starting Next.js server on port 3000..."
echo "================================================"
echo ""

# Start the Next.js server
exec node server.js
