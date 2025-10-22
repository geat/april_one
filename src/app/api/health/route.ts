import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simple health check - you can add database connection check here if needed
    return NextResponse.json(
      { 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}