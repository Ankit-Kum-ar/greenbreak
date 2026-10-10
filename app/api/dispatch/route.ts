import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { runGemmaInference, parseEvaluationJSON } from "@/lib/ai-engine";

export interface DispatchRequestBody {
  name?: string;
  durationMinutes?: number;
  environment?: string;
  focusArea?: string;
}

export async function POST(req: Request) {
  try {
    const body: DispatchRequestBody = await req.json();
    const {
      name = "Developer",
      durationMinutes = 15,
      environment = "Urban Sidewalk",
      focusArea = "Relieve Eye Strain",
    } = body;

    const trimmedName = name.trim() || "Developer";

    const systemPrompt = `
You are an environmental wellness guide helping screen-bound developers take a quick, screen-free outdoor micro-break.
The user has ${durationMinutes} minutes in a "${environment}" environment with a goal to "${focusArea}".
Create a real-world, screen-free sensory mission with NO MAPS, NO APPS, and NO DIGITAL TRACKING.
Return strictly valid JSON matching:
{
  "title": "<Concise, inspiring mission title under 5 words>",
  "steps": [
    "<Step 1: Direct physical/movement action>",
    "<Step 2: Sensory cue: observation of sight, sound, or touch>",
    "<Step 3: Mindful grounding cue: horizon gaze or plant/nature tactile check>"
  ]
}
`;

    const prompt = `User: ${trimmedName}. Setting: ${environment}. Duration: ${durationMinutes} mins. Focus: ${focusArea}. Dispatch the mission.`;
    const { raw, provider } = await runGemmaInference(prompt, systemPrompt);
    const parsed = parseEvaluationJSON(raw);

    const newSession = {
      userName: trimmedName,
      fullName: trimmedName,
      durationMinutes: Number(durationMinutes) || 15,
      environment,
      focusArea,
      mission: {
        title: parsed.title || "The Sunlight Reset",
        steps: parsed.steps && parsed.steps.length > 0 ? parsed.steps : [
          "Step into direct natural light.",
          "Gaze 20 meters away to relax eye strain.",
          "Touch living bark, leaves, or soil."
        ]
      },
      aiProvider: provider,
      status: "in_progress",
      startedAt: new Date()
    };

    let sessionId: string | null = null;
    try {
      const client = await clientPromise;
      const db = client.db("greenbreak");
      const result = await db.collection("breaks").insertOne(newSession);
      sessionId = result.insertedId.toString();
    } catch (dbErr) {
      console.warn("MongoDB write failed, continuing in ephemeral mode:", dbErr);
      sessionId = "ephemeral_" + Date.now();
    }

    return NextResponse.json({
      success: true,
      sessionId,
      mission: newSession.mission,
      durationMinutes: newSession.durationMinutes,
      provider,
      name: trimmedName,
    });
  } catch (error: any) {
    console.error("Dispatch error:", error);
    return NextResponse.json(
      { error: "Failed to dispatch break", details: error?.message },
      { status: 500 }
    );
  }
}
