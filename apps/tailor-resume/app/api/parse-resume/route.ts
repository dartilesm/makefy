import { google } from "@ai-sdk/google";
import { generateObject, streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import PDFParser, { Output } from "pdf2json";
import { resumeDataSchema } from "../../../schemas/resume-data.schema";
import { createObjectReadableStream } from "@/utils/create-object-readable-stream";
import { resumeDataMocked } from "@/constants/resume-data-mock";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    /*     const pdfData = await streamObject({
      model: google("gemini-1.5-flash-latest"),
      schema: resumeDataSchema,
      system:
        "You are a resume parser. Extract structured information from the resume. Fix any spelling errors and normalize whitespace in the extracted text. Ensure consistent spacing and formatting in the output. If you detect bullet points, convert them to a list of items.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Parse the PDF",
            },
            {
              type: "file",
              data: buffer,
              mimeType: "application/pdf",
            },
          ],
        },
      ],
    });
    return pdfData.toTextStreamResponse(); */

    const stream = createObjectReadableStream(resumeDataMocked);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}

/* function getPDFData(buffer: Buffer): Promise<Output> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      resolve(pdfData);
    });

    pdfParser.on("pdfParser_dataError", (error) => {
      reject(error);
    });

    pdfParser.parseBuffer(buffer);
  });
}
 */
