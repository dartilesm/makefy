import { NextRequest, NextResponse } from "next/server";
import {
  resumeDataSchema,
  ResumeDataSchemaType,
} from "@/schemas/resume-data.schema";
import { resumeDataMocked } from "@/constants/resume-data-mock";
import { createObjectReadableStream } from "@/utils/create-object-readable-stream";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { resumeRawContent } = await request.json();

    if (!resumeRawContent) {
      return NextResponse.json(
        { error: "Resume content is required" },
        { status: 400 },
      );
    }

    // Stream the parsed resume object
    /* const result = streamObject({
      model: google("gemini-2.0-flash-001"),
      system:
        "You are a resume parser. Extract structured information from the resume. Fix any spelling errors and normalize whitespace in the extracted text. Ensure consistent spacing and formatting in the output.",
      prompt: `Parse this resume into a structured format: ${resumeRawContent}`,
      schema: resumeDataSchema,
      experimental_transform: smoothStream(),
    });
    return result.toTextStreamResponse(); */

    const stream = createObjectReadableStream(resumeDataMocked);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error structuring resume data:", error);
    return NextResponse.json(
      { error: "Failed to structure resume data" },
      { status: 500 },
    );
  }
}
