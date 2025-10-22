import { pgTable, serial, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const websitePage = pgTable("website_page", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type WebsitePage = typeof websitePage.$inferSelect;
export type NewWebsitePage = typeof websitePage.$inferInsert;
