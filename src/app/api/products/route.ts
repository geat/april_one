import { db } from "@/db";
import { product, category } from "@/db/schema";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { eq, ilike, and, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

// GET /api/products - List products with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];
    conditions.push(eq(product.isActive, true));

    if (search) {
      conditions.push(ilike(product.name, `%${search}%`));
    }

    if (categoryId) {
      conditions.push(eq(product.categoryId, categoryId));
    }

    // Get products
    const products = await db
      .select({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        stock: product.stock,
        imageUrls: product.imageUrls,
        category: {
          id: category.id,
          name: category.name,
        },
      })
      .from(product)
      .leftJoin(category, eq(product.categoryId, category.id))
      .where(and(...conditions))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(product)
      .where(and(...conditions));

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total: Number(count),
        totalPages: Math.ceil(Number(count) / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, price, categoryId, stock, imageUrls } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const newProduct = await db
      .insert(product)
      .values({
        id: nanoid(),
        name,
        description,
        price: price.toString(),
        categoryId,
        stock: stock || 0,
        imageUrls,
        isActive: true,
      })
      .returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
