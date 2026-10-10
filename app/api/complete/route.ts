import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { runGemmaInference, parseEvaluationJSON } from "@/lib/ai-engine";

export interface CompleteRequestBody {
  sessionId?: string;
  observation: string;
  durationMinutes?: number;
  environment?: string;
}

export async function POST(req: Request) {
  try {
    const body: CompleteRequestBody = await req.json();
    const { sessionId, observation, durationMinutes = 15, environment = "Outdoors" } = body;

    if (!observation || observation.trim().length === 0) {
      return NextResponse.json(
        { error: "Observation text is required." },
        { status: 400 }
      );
    }

    let sessionDuration = durationMinutes;
    let sessionEnv = environment;

    let dbSession: any = null;
    let client: any = null;
    let db: any = null;

    try {
      client = await clientPromise;
      db = client.db("greenbreak");
      if (sessionId && ObjectId.isValid(sessionId)) {
        dbSession = await db.collection("breaks").findOne({ _id: new ObjectId(sessionId) });
        if (dbSession) {
          sessionDuration = dbSession.durationMinutes || sessionDuration;
          sessionEnv = dbSession.environment || sessionEnv;
        }
      }
    } catch (err) {
      console.warn("MongoDB read failed or unavailable, proceeding with request body values:", err);
    }

    const systemPrompt = `
You are an outdoor nature coach. A developer just returned from a ${sessionDuration}-minute outdoor break in a ${sessionEnv}.
They submitted this sensory observation: "${observation}".
Evaluate how mindfully they engaged with the physical world.
Return strictly valid JSON:
{
  "sensoryScore": <number 1-10>,
  "badgeEarned": "<Clever 2-3 word outdoor title badge, e.g. Bark Tactician, Canopy Gazer, Horizon Scout>",
  "insight": "<1-2 encouraging sentences reflecting on their outdoor discovery>"
}
`;

    const { raw, provider } = await runGemmaInference(
      `Observation: ${observation}`,
      systemPrompt
    );
    const evaluation = parseEvaluationJSON(raw);

    const safeEvaluation = {
      sensoryScore: evaluation.sensoryScore ?? 8,
      badgeEarned: evaluation.badgeEarned || "Fresh Air Explorer",
      insight: evaluation.insight || "Great job stepping away from the screen and connecting with your surroundings."
    };

    let totalMinutes = sessionDuration;
    let totalBreaks = 1;

    if (db && sessionId && ObjectId.isValid(sessionId)) {
      try {
        await db.collection("breaks").updateOne(
          { _id: new ObjectId(sessionId) },
          {
            $set: {
              status: "completed",
              observation,
              evaluation: safeEvaluation,
              evalProvider: provider,
              completedAt: new Date()
            }
          }
        );

        const completedBreaks = await db.collection("breaks").find({ status: "completed" }).toArray();
        totalMinutes = completedBreaks.reduce((acc: number, b: any) => acc + (b.durationMinutes || 0), 0);
        totalBreaks = completedBreaks.length;
      } catch (updateErr) {
        console.warn("MongoDB update stats failed:", updateErr);
      }
    }

    return NextResponse.json({
      success: true,
      evaluation: safeEvaluation,
      totalMinutes,
      totalBreaks,
      provider
    });
  } catch (error: any) {
    console.error("Complete break error:", error);
    return NextResponse.json(
      { error: "Failed to complete break", details: error?.message },
      { status: 500 }
    );
  }
}
