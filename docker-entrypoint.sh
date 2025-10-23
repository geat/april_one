#!/bin/sh

echo "================================================"
echo "Starting application deployment..."
echo "================================================"

# Check required environment variables
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set!"
  exit 1
fi

echo "Environment check passed ✓"
echo "NODE_ENV: ${NODE_ENV:-not set}"
echo "DATABASE_URL: ${DATABASE_URL:0:30}... (truncated)"

# Run database migrations
echo ""
echo "Running database migrations..."
echo "Using drizzle-kit push for production deployment..."
if npx drizzle-kit push --force --verbose 2>&1; then
  echo "✓ Database schema synchronized successfully"
else
  EXIT_CODE=$?
  echo "⚠️  Database sync exited with code $EXIT_CODE"
  echo "This may be normal if schema is already up to date"
  echo "Continuing with startup..."
fi

# Run database seed
echo ""
echo "Running database seed..."
if npm run db:seed 2>&1; then
  echo "✓ Database seed completed successfully"
else
  EXIT_CODE=$?
  echo "⚠️  Database seed exited with code $EXIT_CODE"
  echo "This may be normal if database is already seeded"
  echo "Continuing with startup..."
fi

echo ""
echo "================================================"
echo "Starting Next.js server on port 3000..."
echo "================================================"

# Start the Next.js server
exec node server.js
