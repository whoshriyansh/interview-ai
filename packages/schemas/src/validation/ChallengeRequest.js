import * as z from "zod";
export const challengeRequestSchema = z.object({
    experience: z
        .string()
        .min(1, "Experience is required")
        .regex(/^\d+$/, "Experience should be a valid number in years")
        .transform((val) => Number(val)),
    techStack: z
        .array(z.string().min(1, "Tech stack entry cannot be empty"))
        .min(1, "At least one tech stack is required"),
    difficulty: z
        .enum(["Easy", "Medium", "Hard", "Advance"])
        .refine((val) => !!val, {
        message: "Please select a difficulty level",
    }),
    purpose: z
        .enum([
        "Machine Coding Round",
        "Technical Round",
        "DSA Round",
        "System Design",
    ])
        .refine((val) => !!val, {
        message: "Please select a purpose",
    }),
});
//# sourceMappingURL=ChallengeRequest.js.map