#!/bin/sh
set -e

echo "Running database migrations..."
npx drizzle-kit push

echo "Running database seed..."
npx tsx scripts/seed.ts || echo "Seed script failed or already executed, continuing..."

echo "Starting Next.js application..."
exec node server.js
