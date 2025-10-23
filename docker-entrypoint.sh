#!/bin/sh
set -e

echo "Starting application deployment..."

# Wait for database to be ready (useful for Railway)
echo "Checking database connection..."
npx drizzle-kit push --force || echo "Database push failed, continuing..."

echo "Running database seed..."
npm run db:seed || echo "Seed script failed or already executed, continuing..."

echo "Starting Next.js application..."
exec node server.js
