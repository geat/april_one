import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { websitePage } from "@/db/schema";
import { eq, and } from "drizzle-orm";

// GET page by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const [page] = await db
      .select()
      .from(websitePage)
      .where(
        and(
          eq(websitePage.slug, params.slug),
          eq(websitePage.isActive, true)
        )
      );

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}
