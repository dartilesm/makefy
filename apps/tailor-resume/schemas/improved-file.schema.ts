import { z } from "zod";
export const improvedFieldSchema = z.object({
  value: z
    .string()
    .describe(
      "It is the actual improved field value with the suggestions applied",
    ),
  suggestionsApplied: z.string().describe(
    `It is the explanation of the suggestions that were applied to the field. 
      What was changed and why?
      If you want to add examples, use the ones provided in the value field.
      It's a markdown text, make it short and to the point with bullet points.
      Keep it short and concise.
      Specify which areasToExpand and which keyJobQualifications were expanded, don't explicitly mention the suggestions key areasToExpand and keyJobQualifications, just mention the ones that were expanded.

      The answer must be in the following format:
      - **Improvement 1**: [Improvement 1 explanation]
      - **Improvement 2**: [Improvement 2 explanation]
      - Etc.
      `,
  ),
  originalText: z.string().describe("It is the original field value"),
});

export type ImprovedFieldSchemaType = z.infer<typeof improvedFieldSchema>;
