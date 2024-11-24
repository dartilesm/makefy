import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { topic, duration, style, targetAudience, keyPoints } =
    await req.json();

  const result = await streamText({
    model: google("gemini-1.5-flash-latest"),
    messages: [
      {
        role: "system",
        content: `You are an expert podcast script writer who creates engaging and well-structured scripts.
        Always include clear segment transitions, natural dialogue, and appropriate pacing.
        Format the script with clear speaker indicators, timing suggestions, and segment breaks.`,
      },
      {
        role: "user",
        content: `Create a ${duration}-minute podcast script about "${topic}" in a ${style} style.
        Target Audience: ${targetAudience}
        ${keyPoints ? `Key Points to Cover:\n${keyPoints}` : ""}
        
        Please include:
        1. Introduction with hook
        2. Clear segment structure
        3. Natural transitions
        4. Engaging questions/discussion points
        5. Clear conclusion
        6. Time markers for each segment
        
        Format the script with speaker indicators (HOST:, GUEST:, etc.) and include [SEGMENT] markers.`,
      },
    ],
  });

  return result.toDataStreamResponse();
}
