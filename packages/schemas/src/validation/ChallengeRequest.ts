import * as z from "zod";

export const challengeRequestSchema = z.object({
  experience: z
    .string()
    .regex(/^\d+$/, "Experience should be a number in years")
    .transform((val) => Number(val)),
  techStack: z
    .array(z.string().min(1))
    .min(1, "At least one tech stack is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard", "Advance"]),
  purpose: z.enum([
    "Machine Coding Round",
    "Technical Round",
    "DSA Round",
    "System Design",
  ]),
});
