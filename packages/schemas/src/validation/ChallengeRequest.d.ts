import * as z from "zod";
export declare const challengeRequestSchema: z.ZodObject<{
    experience: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    techStack: z.ZodArray<z.ZodString>;
    difficulty: z.ZodEnum<{
        Easy: "Easy";
        Medium: "Medium";
        Hard: "Hard";
        Advance: "Advance";
    }>;
    purpose: z.ZodEnum<{
        "Machine Coding Round": "Machine Coding Round";
        "Technical Round": "Technical Round";
        "DSA Round": "DSA Round";
        "System Design": "System Design";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=ChallengeRequest.d.ts.map