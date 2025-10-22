import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { websiteSlider } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

// GET all active sliders (ordered)
export async function GET() {
  try {
    const sliders = await db
      .select()
      .from(websiteSlider)
      .where(eq(websiteSlider.isActive, true))
      .orderBy(asc(websiteSlider.orderIndex));

    return NextResponse.json(sliders);
  } catch (error) {
    console.error("Error fetching sliders:", error);
    return NextResponse.json(
      { error: "Failed to fetch sliders" },
      { status: 500 }
    );
  }
}

// POST create new slider
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const [newSlider] = await db
      .insert(websiteSlider)
      .values({
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        imageUrl: body.imageUrl,
        buttonText: body.buttonText,
        buttonLink: body.buttonLink,
        isActive: body.isActive ?? true,
        orderIndex: body.orderIndex ?? 0,
      })
      .returning();

    return NextResponse.json(newSlider);
  } catch (error) {
    console.error("Error creating slider:", error);
    return NextResponse.json(
      { error: "Failed to create slider" },
      { status: 500 }
    );
  }
}
