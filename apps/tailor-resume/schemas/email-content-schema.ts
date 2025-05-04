import { z } from "zod";

export const emailContentSchema = z.object({
  subject: z.string(),
  body: z.string(),
});

export type EmailContentSchemaType = z.infer<typeof emailContentSchema>;
