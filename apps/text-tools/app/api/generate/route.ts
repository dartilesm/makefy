import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const { topic, tone } = await req.json();

  const result = await streamText({
    model: google("gemini-1.5-flash-latest"),
    messages: [
      {
        role: "system",
        content:
          "You are an expert TikTok content creator who specializes in creating engaging hooks (first 3 seconds) for videos.",
      },
      {
        role: "user",
        content: `Generate 3 attention-grabbing TikTok hooks for a video about "${topic}". The tone should be ${tone}. Each hook should be short, punchy, and make viewers want to keep watching.`,
      },
    ],
  });

  return result.toDataStreamResponse();
}
