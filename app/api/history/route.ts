import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nameParam = searchParams.get("name")?.trim();

    if (!nameParam) {
      return NextResponse.json({
        success: true,
        history: [],
        totalMinutes: 0,
        totalBreaks: 0,
        name: "",
      });
    }

    const client = await clientPromise;
    const db = client.db("greenbreak");

    // Case-insensitive regex match on userName or fullName
    const escapedName = nameParam.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const query = {
      status: "completed",
      $or: [
        { userName: { $regex: new RegExp(`^${escapedName}$`, "i") } },
        { fullName: { $regex: new RegExp(`^${escapedName}$`, "i") } },
      ],
    };

    const history = await db
      .collection("breaks")
      .find(query)
      .sort({ completedAt: -1 })
      .limit(50)
      .toArray();

    const totalMinutes = history.reduce(
      (acc: number, item: any) => acc + (item.durationMinutes || 0),
      0
    );

    return NextResponse.json({
      success: true,
      history,
      totalMinutes,
      totalBreaks: history.length,
      name: nameParam,
    });
  } catch (error: any) {
    console.warn("History fetch error:", error?.message);
    return NextResponse.json({
      success: true,
      history: [],
      totalMinutes: 0,
      totalBreaks: 0,
    });
  }
}
