import { google } from "@ai-sdk/google";
import { generateObject, streamObject, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { improvedFieldSchema } from "@/schemas/improved-file.schema";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { fieldContent, fieldName, suggestions } = await request.json();

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
            Improve this ${fieldName} text by applying these suggestions:
            
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
            7. Keep similar length to original
          `,
      schema: improvedFieldSchema
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error improving field:", error);
    throw error;
  }
}
