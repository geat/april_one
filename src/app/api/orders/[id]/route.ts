import { db } from "@/db";
import { order, orderItem, product } from "@/db/schema";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

// GET /api/orders/[id] - Get order details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get order
    const orderData = await db
      .select()
      .from(order)
      .where(
        and(eq(order.id, id), eq(order.userId, session.user.id))
      )
      .limit(1);

    if (!orderData || orderData.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Get order items with product details
    const items = await db
      .select({
        id: orderItem.id,
        quantity: orderItem.quantity,
        price: orderItem.price,
        product: {
          id: product.id,
          name: product.name,
          imageUrls: product.imageUrls,
        },
      })
      .from(orderItem)
      .leftJoin(product, eq(orderItem.productId, product.id))
      .where(eq(orderItem.orderId, id));

    return NextResponse.json({
      ...orderData[0],
      items,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
