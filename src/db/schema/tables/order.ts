import { pgTable, text, timestamp, decimal } from "drizzle-orm/pg-core";
import { user } from "./user";
import { orderStatus } from "../enums/order-status";

export const order = pgTable("order", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: orderStatus("status").default("pending").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  billingAddress: text("billing_address").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type OrderType = typeof order.$inferSelect;
export type OrderInsertType = typeof order.$inferInsert;
