import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const websiteSetting = pgTable("website_setting", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type WebsiteSetting = typeof websiteSetting.$inferSelect;
export type NewWebsiteSetting = typeof websiteSetting.$inferInsert;
