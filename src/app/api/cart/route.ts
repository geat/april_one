import { db } from "@/db";
import { shoppingCart, product } from "@/db/schema";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

// GET /api/cart - Get user's cart
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartItems = await db
      .select({
        id: shoppingCart.id,
        quantity: shoppingCart.quantity,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrls: product.imageUrls,
          stock: product.stock,
        },
      })
      .from(shoppingCart)
      .leftJoin(product, eq(shoppingCart.productId, product.id))
      .where(eq(shoppingCart.userId, session.user.id));

    return NextResponse.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    // Check if item already exists in cart
    const existingItem = await db
      .select()
      .from(shoppingCart)
      .where(
        and(
          eq(shoppingCart.userId, session.user.id),
          eq(shoppingCart.productId, productId)
        )
      )
      .limit(1);

    if (existingItem.length > 0) {
      // Update quantity
      const updated = await db
        .update(shoppingCart)
        .set({
          quantity: existingItem[0].quantity + quantity,
          updatedAt: new Date(),
        })
        .where(eq(shoppingCart.id, existingItem[0].id))
        .returning();

      return NextResponse.json(updated[0]);
    } else {
      // Add new item
      const newItem = await db
        .insert(shoppingCart)
        .values({
          id: nanoid(),
          userId: session.user.id,
          productId,
          quantity,
        })
        .returning();

      return NextResponse.json(newItem[0], { status: 201 });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
