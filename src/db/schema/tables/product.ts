import {
  pgTable,
  text,
  timestamp,
  decimal,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { category } from "./category";

export const product = pgTable("product", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  categoryId: text("category_id").references(() => category.id, {
    onDelete: "set null",
  }),
  stock: integer("stock").default(0).notNull(),
  imageUrls: text("image_urls").array(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ProductType = typeof product.$inferSelect;
export type ProductInsertType = typeof product.$inferInsert;
