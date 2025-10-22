import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { websiteSetting } from "@/db/schema";
import { eq } from "drizzle-orm";

// PUT update setting
export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const body = await request.json();

    // Check if setting exists
    const [existing] = await db
      .select()
      .from(websiteSetting)
      .where(eq(websiteSetting.key, params.key));

    if (existing) {
      // Update existing setting
      const [updated] = await db
        .update(websiteSetting)
        .set({
          value: body.value,
          description: body.description,
          updatedAt: new Date(),
        })
        .where(eq(websiteSetting.key, params.key))
        .returning();

      return NextResponse.json(updated);
    } else {
      // Create new setting
      const [created] = await db
        .insert(websiteSetting)
        .values({
          key: params.key,
          value: body.value,
          description: body.description,
        })
        .returning();

      return NextResponse.json(created);
    }
  } catch (error) {
    console.error("Error updating setting:", error);
    return NextResponse.json(
      { error: "Failed to update setting" },
      { status: 500 }
    );
  }
}
