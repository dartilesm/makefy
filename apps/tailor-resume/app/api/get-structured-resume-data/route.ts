import { google } from "@ai-sdk/google";
import { streamObject, smoothStream } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { resumeSchema } from "@/schemas/resume-data.schema";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { rawContent } = await request.json();

    if (!rawContent) {
      return NextResponse.json(
        { error: "Resume content is required" },
        { status: 400 },
      );
    }

    // Stream the parsed resume object
    const result = streamObject({
      model: google("gemini-2.0-flash-001"),
      system:
        "You are a resume parser. Extract structured information from the resume.",
      prompt: `Parse this resume into a structured format: ${rawContent}`,
      schema: resumeSchema,
      experimental_transform: smoothStream(),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error structuring resume data:", error);
    return NextResponse.json(
      { error: "Failed to structure resume data" },
      { status: 500 },
    );
  }
}
