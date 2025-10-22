import { db } from "@/db";
import { order, orderItem, product, shoppingCart } from "@/db/schema";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

// GET /api/orders - Get user's order history
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await db
      .select()
      .from(order)
      .where(eq(order.userId, session.user.id))
      .orderBy(desc(order.createdAt));

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { shippingAddress, billingAddress, items } = body;

    if (!shippingAddress || !billingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const productData = await db
        .select()
        .from(product)
        .where(eq(product.id, item.productId))
        .limit(1);

      if (!productData || productData.length === 0) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        );
      }

      const productPrice = parseFloat(productData[0].price);
      totalAmount += productPrice * item.quantity;

      orderItemsData.push({
        id: nanoid(),
        productId: item.productId,
        quantity: item.quantity,
        price: productPrice.toString(),
      });
    }

    // Create order
    const orderId = nanoid();
    const newOrder = await db
      .insert(order)
      .values({
        id: orderId,
        userId: session.user.id,
        totalAmount: totalAmount.toString(),
        shippingAddress,
        billingAddress,
        status: "pending",
      })
      .returning();

    // Create order items
    const orderItemsWithOrderId = orderItemsData.map((item) => ({
      ...item,
      orderId,
    }));

    await db.insert(orderItem).values(orderItemsWithOrderId);

    // Clear shopping cart
    await db
      .delete(shoppingCart)
      .where(eq(shoppingCart.userId, session.user.id));

    return NextResponse.json(newOrder[0], { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
