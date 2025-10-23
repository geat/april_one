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
if npx drizzle-kit push --force; then
  echo "✓ Database migrations completed successfully"
else
  echo "WARNING: Database migrations failed (this may be normal if already applied)"
fi

# Run database seed
echo ""
echo "Running database seed..."
if npm run db:seed; then
  echo "✓ Database seed completed successfully"
else
  echo "WARNING: Database seed failed (this may be normal if already seeded)"
fi

echo ""
echo "================================================"
echo "Starting Next.js server on port 3000..."
echo "================================================"

# Start the Next.js server
exec node server.js
