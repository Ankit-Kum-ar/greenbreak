export interface MissionPlan {
  title: string;
  steps: string[];
}

export interface BreakEvaluation {
  title?: string;
  steps?: string[];
  sensoryScore: number;
  badgeEarned: string;
  insight: string;
}

export interface InferenceResult {
  raw: string;
  provider: string;
}

export function parseEvaluationJSON(rawText: string): BreakEvaluation & { title?: string; steps?: string[] } {
  try {
    const match = rawText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found");
    return JSON.parse(match[0]);
  } catch (err) {
    return {
      title: "Natural Ambient Reset",
      steps: [
        "Step outside into natural light away from electronic devices.",
        "Fix your gaze on distant trees or the skyline for 60 seconds.",
        "Focus on steady breathing and physical sensations of ambient air."
      ],
      sensoryScore: 8,
      badgeEarned: "Fresh Air Pathfinder",
      insight: "Refocused attention on natural physical sensations."
    };
  }
}

async function queryBackboard(prompt: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.BACKBOARD_API_KEY;
  if (!apiKey) throw new Error("Missing BACKBOARD_API_KEY");

  const res = await fetch("https://app.backboard.io/api/threads/messages", {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `${systemPrompt}\n\nUser Request: ${prompt}`,
      model: "google/gemma-2-27b-it",
      system_prompt: systemPrompt,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Backboard HTTP status ${res.status}: ${errText}`);
  }

  const data = await res.json();
  if (data?.content) {
    return data.content;
  }
  throw new Error("Unexpected Backboard response structure");
}

async function queryOpenRouter(prompt: string, systemPrompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("Missing OPENROUTER_API_KEY");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      models: [
        "google/gemma-2-9b-it:free",
        "google/gemma-3-12b-it:free",
        "openrouter/free"
      ],
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error(`OpenRouter HTTP status ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

export async function runGemmaInference(prompt: string, systemPrompt: string): Promise<InferenceResult> {
  try {
    const raw = await queryBackboard(prompt, systemPrompt);
    return { raw, provider: "Backboard API (Gemma 27B)" };
  } catch (err1: any) {
    console.warn("Backboard unavailable, trying OpenRouter fallback:", err1.message);
    try {
      const raw = await queryOpenRouter(prompt, systemPrompt);
      return { raw, provider: "OpenRouter Free (Gemma 9B)" };
    } catch (err2: any) {
      console.error("All AI providers exhausted:", err2.message);
      return {
        raw: JSON.stringify({
          title: "Micro Sunlight Break",
          steps: [
            "Walk into direct ambient daylight without your phone.",
            "Observe the closest natural greenery, leaf, or soil texture.",
            "Take 10 deliberate deep breaths while listening to surroundings."
          ],
          sensoryScore: 8,
          badgeEarned: "Fresh Air Pathfinder",
          insight: "Step into daylight and enjoy a mindful screen-free moment."
        }),
        provider: "Emergency Fallback"
      };
    }
  }
}
