#!/bin/sh
set -e

echo "Starting application deployment..."

# Wait for database to be ready (useful for Railway)
echo "Checking database connection..."
npx drizzle-kit push || echo "Database push failed, continuing..."

echo "Running database seed..."
npx tsx scripts/seed.ts || echo "Seed script failed or already executed, continuing..."

echo "Starting Next.js application..."
exec node server.js
