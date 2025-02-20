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

      Make it short and concise.

      Prioritize the areas that are most relevant to the job description up to 5 areas, it could be less if there are not many areas to expand.
      
      Remember to use the markdown format for the bullet points.`,
  ),
  exampleText: z.string().describe(
    `Example text that the candidate should use to improve their resume. The content must be in bullet points and markdown format.
      
      Make it short and concise.
      
      Mention where the candidate should use the example text.`,
  ),
});

export type ResumeSuggestionsSchemaType = z.infer<
  typeof resumeSuggestionsSchema
>;
