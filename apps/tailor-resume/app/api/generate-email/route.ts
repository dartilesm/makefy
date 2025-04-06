import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const maxDuration = 30;
export const dynamic = "force-dynamic";

export const emailContentSchema = z.object({
  subject: z.string(),
  body: z.string(),
});

export type EmailContentType = {
  subject: string;
  body: string;
};

export async function POST(request: NextRequest) {
  const result = await streamObject({
    model: google("gemini-2.0-flash-001"),
    system:
      "You are a professional email writer specializing in job applications. Generate a template that can be customized with specific details later.",
    prompt: `Create a professional job application email template.

The email should have placeholders that will be replaced later:
- [JOB_TITLE] for the position being applied for
- [COMPANY_NAME] for the company name
- [RESUME_URL] for the resume link

Requirements:
1. Professional and persuasive tone
2. Show genuine enthusiasm for the role and company
3. Reference the resume being attached/linked
4. Keep the body under 200 words
5. Use natural, flowing language
6. Include a clear call to action

The response must follow this exact format:
{
  "subject": "Application for [JOB_TITLE] position at [COMPANY_NAME]",
  "body": "Dear Hiring Manager,\\n\\nI am writing to express my interest..."
}

Make sure the email feels personal and engaging, not generic or robotic.`,
    schema: emailContentSchema,
  });

  return result.toTextStreamResponse();
}
