import { pgTable, text, timestamp, integer, decimal } from "drizzle-orm/pg-core";
import { order } from "./order";
import { product } from "./product";

export const orderItem = pgTable("order_item", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .references(() => order.id, { onDelete: "cascade" })
    .notNull(),
  productId: text("product_id")
    .references(() => product.id, { onDelete: "restrict" })
    .notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type OrderItemType = typeof orderItem.$inferSelect;
export type OrderItemInsertType = typeof orderItem.$inferInsert;
