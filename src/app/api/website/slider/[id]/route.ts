import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { websiteSlider } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET single slider
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [slider] = await db
      .select()
      .from(websiteSlider)
      .where(eq(websiteSlider.id, parseInt(id)));

    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }

    return NextResponse.json(slider);
  } catch (error) {
    console.error("Error fetching slider:", error);
    return NextResponse.json(
      { error: "Failed to fetch slider" },
      { status: 500 }
    );
  }
}

// PUT update slider
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [updatedSlider] = await db
      .update(websiteSlider)
      .set({
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        imageUrl: body.imageUrl,
        buttonText: body.buttonText,
        buttonLink: body.buttonLink,
        isActive: body.isActive,
        orderIndex: body.orderIndex,
        updatedAt: new Date(),
      })
      .where(eq(websiteSlider.id, parseInt(id)))
      .returning();

    if (!updatedSlider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSlider);
  } catch (error) {
    console.error("Error updating slider:", error);
    return NextResponse.json(
      { error: "Failed to update slider" },
      { status: 500 }
    );
  }
}

// DELETE slider
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [deletedSlider] = await db
      .delete(websiteSlider)
      .where(eq(websiteSlider.id, parseInt(id)))
      .returning();

    if (!deletedSlider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting slider:", error);
    return NextResponse.json(
      { error: "Failed to delete slider" },
      { status: 500 }
    );
  }
}
