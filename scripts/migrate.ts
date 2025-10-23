import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function runMigrations() {
  console.log("🔄 Running database migrations...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✓ Loaded" : "✗ Missing");

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  try {
    // Create connection for migrations
    const migrationClient = postgres(process.env.DATABASE_URL, { max: 1 });
    const db = drizzle(migrationClient);

    // Run migrations
    await migrate(db, { migrationsFolder: "./drizzle" });

    console.log("✅ Migrations completed successfully!");

    // Close connection
    await migrationClient.end();

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
