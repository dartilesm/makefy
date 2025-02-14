import { z } from "zod";

export const resumeSuggestionsSchema = z.object({
  keyJobQualifications: z.array(z.string()),
  areasToExpand: z.array(z.string()),
  exampleText: z.array(z.string()),
});

export type ResumeSuggestionsSchemaType = z.infer<
  typeof resumeSuggestionsSchema
>;
