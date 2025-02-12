import { z } from "zod";

export const resumeSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  links: z.array(z.string()),
  summary: z.string(),
  experience: z.array(
    z.object({
      company: z.string(),
      title: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      description: z.string(),
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
  skills: z.array(z.string()),
});
