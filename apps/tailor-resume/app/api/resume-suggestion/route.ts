import { google } from "@ai-sdk/google";
import { smoothStream, streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { resumeSuggestionsSchema } from "@/schemas/resume-suggestions.schema";
import { createObjectReadableStream } from "@/utils/create-object-readable-stream";
import { resumeSuggestionsMock } from "@/constants/resume-suggestions-mock";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { resumeData, jobDescription, jobTitle } = await request.json();

    if (!resumeData || !jobDescription || !jobTitle) {
      return NextResponse.json(
        { error: "Resume text, job description and job title are required" },
        { status: 400 },
      );
    }

    // Stream improvement suggestions based on job description
    /*     const result = streamObject({
      model: google("gemini-2.0-flash-001"),
      system: `You are a career advisor. You will analyze a resume against a job description and provide specific suggestions to help the candidate optimize their resume for the role.`,
      prompt: `Analyze this resume against the job description and provide specific suggestions for improvement.
        Resume: ${JSON.stringify(resumeData)}
        Job Title: ${jobTitle}
        Job Description: ${jobDescription}`,
      schema: resumeSuggestionsSchema,
      experimental_transform: smoothStream(),
    });

    return result.toTextStreamResponse(); */

    const stream = createObjectReadableStream(resumeSuggestionsMock);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Failed to generate suggestions" },
      { status: 500 },
    );
  }
}
