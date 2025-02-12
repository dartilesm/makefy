import { z } from "zod";

export const resumeSuggestionsSchema = z.object({
  keyJobQualifications: z.array(z.string()),
  skillsToHighlight: z.array(z.string()),
  areasToExpand: z.array(z.string()),
  keywordsToInclude: z.array(z.string()),
  achievementsToQuantify: z.array(z.string()),
  exampleText: z.array(z.string()),
});
