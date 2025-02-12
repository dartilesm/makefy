import { google } from "@ai-sdk/google";
import { smoothStream, streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { resumeSuggestionsSchema } from "@/schemas/resume-suggestions.schema";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Resume text and job description are required" },
        { status: 400 },
      );
    }

    // Stream improvement suggestions based on job description
    const result = streamObject({
      model: google("gemini-1.5-flash-latest"),
      system: `You are a career advisor. You will analyze a resume against a job description and provide specific suggestions to help the candidate optimize their resume for the role.`,
      prompt: `Analyze this resume against the job description and provide specific suggestions for improvement.
        Resume: ${resumeText}
        Job Description: ${jobDescription}`,
      schema: resumeSuggestionsSchema,
      experimental_transform: smoothStream(),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 },
    );
  }
}
