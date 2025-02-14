import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import PDFParser, { Output } from "pdf2json";
import { resumeDataSchema } from "../../../schemas/resume-data.schema";

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
    const pdfData = await getPDFData(buffer);

    // Extract text from PDF
    const pages = pdfData.Pages || [];
    let fullText = "";

    for (const page of pages) {
      const texts = page.Texts || [];
      for (const text of texts) {
        const decodedText = decodeURIComponent(text.R?.[0]?.T || "");
        fullText += decodedText;
      }
      fullText += "\n";
    }

    // Clean up the text
    const cleanedText = fullText
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\\u[\dA-F]{4}/gi, (match) => {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
      });

    return NextResponse.json({ rawContent: cleanedText });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}

function getPDFData(buffer: Buffer): Promise<Output> {
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
