import { z } from "zod";

export const resumeDataSchema = z.object({
  personalInfo: z.object({
    fullName: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    website: z.string(),
  }),
  summary: z.string().describe("Use markdown for the summary"),
  experience: z.array(
    z.object({
      company: z.string(),
      title: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      description: z.string().describe("Use markdown for the description"),
    }),
  ),
  education: z.array(
    z.object({
      school: z.string(),
      degree: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    }),
  ),
  skills: z.string().describe("Use markdown for the skills"),
});

export type ResumeDataSchemaType = z.infer<typeof resumeDataSchema>;
