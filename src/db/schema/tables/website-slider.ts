import { pgTable, serial, varchar, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const websiteSlider = pgTable("website_slider", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  buttonText: varchar("button_text", { length: 100 }),
  buttonLink: varchar("button_link", { length: 500 }),
  isActive: boolean("is_active").default(true).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type WebsiteSlider = typeof websiteSlider.$inferSelect;
export type NewWebsiteSlider = typeof websiteSlider.$inferInsert;
