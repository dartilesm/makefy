import { z } from "zod";

export const resumeSuggestionsSchema = z.object({
  keyJobQualifications: z
    .string()
    .describe(
      "Key job qualifications that the candidate should highlight in their resume. The content must be in bullet points and markdown format.",
    ),
  areasToExpand: z.string().describe(
    `Areas to expand in the resume to better match the job description. The content must be in bullet points following this format: 
        - **Area to expand**: [Suggestion]
        
      If there are no areas to expand, let the user know that the resume is already optimized for the job description.
      
      Remember to use the markdown format for the bullet points.`,
  ),
  exampleText: z
    .string()
    .describe(
      "Example text that the candidate should use to improve their resume. The content must be in bullet points and markdown format.",
    ),
});

export type ResumeSuggestionsSchemaType = z.infer<
  typeof resumeSuggestionsSchema
>;
