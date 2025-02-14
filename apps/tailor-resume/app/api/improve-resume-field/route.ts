import { google } from "@ai-sdk/google";
import { generateObject, streamObject, streamText, smoothStream } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { improvedFieldSchema } from "@/schemas/improved-file.schema";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

type TextStyle = "rewrite" | "shorten" | "formal" | "casual";

const stylePrompts: Record<TextStyle, string> = {
  rewrite: "Improve and enhance the text while maintaining its core message",
  shorten: "Make the text more concise and impactful, reducing length by ~30%",
  formal: "Make the text more professional and formal in tone",
  casual: "Make the text more conversational and approachable",
};

export async function POST(request: NextRequest) {
  try {
    const {
      fieldContent,
      fieldName,
      suggestions,
      style = "rewrite",
    } = await request.json();

    if (!fieldContent || !fieldName || !suggestions) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await streamObject({
      model: google("gemini-2.0-flash-001"),
      system: `You are a professional resume writer. Your task is to improve the given text while maintaining its core content and authenticity. Apply relevant suggestions but keep the improvements subtle and professional.`,
      prompt: `
            ${stylePrompts[style as TextStyle] || stylePrompts.rewrite}:
            
            Current text: "${fieldContent}"
            
            Relevant suggestions:
            ${JSON.stringify(suggestions, null, 2)}
            
            Rules:
            1. Maintain the core facts and experiences
            2. Make subtle improvements based on the suggestions
            3. Keep the professional tone
            4. Focus on clarity and impact
            5. Quantify achievements where possible
            6. Use active voice
            ${style === "shorten" ? "7. Reduce length while preserving key points" : "7. Keep similar length to original"}
            ${style === "formal" ? "8. Use more formal language and business terms" : ""}
            ${style === "casual" ? "8. Use more approachable and natural language" : ""}
          `,
      schema: improvedFieldSchema,
      experimental_transform: smoothStream(),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error improving field:", error);
    throw error;
  }
}
