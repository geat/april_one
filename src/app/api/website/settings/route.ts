import { NextResponse } from "next/server";
import { db } from "@/db";
import { websiteSetting } from "@/db/schema";

// GET all settings
export async function GET() {
  try {
    const settings = await db.select().from(websiteSetting);

    // Transform to key-value object
    const settingsObj = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string | null>);

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}
