import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { user } from "./user";
import { product } from "./product";

export const shoppingCart = pgTable("shopping_cart", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  productId: text("product_id")
    .references(() => product.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer("quantity").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type ShoppingCartType = typeof shoppingCart.$inferSelect;
export type ShoppingCartInsertType = typeof shoppingCart.$inferInsert;
