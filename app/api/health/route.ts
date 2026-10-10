import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  let dbStatus = "disconnected";
  let errorDetail: string | null = null;

  try {
    const client = await clientPromise;
    const adminDb = client.db("admin");
    const pingResult = await adminDb.command({ ping: 1 });
    if (pingResult.ok) {
      dbStatus = "connected";
    }
  } catch (err: any) {
    dbStatus = "error";
    errorDetail = err?.message || "Unknown database connection error";
  }

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      error: errorDetail,
    },
    aiProviders: {
      backboard: !!process.env.BACKBOARD_API_KEY,
      openrouter: !!process.env.OPENROUTER_API_KEY,
    }
  });
}
