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
      Etc.
      `,
  ),
  originalText: z.string().describe("It is the original field value"),
});

export type ImprovedFieldSchemaType = z.infer<typeof improvedFieldSchema>;
