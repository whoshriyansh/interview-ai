import * as z from "zod";
export declare const codingChallengeSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    input_format: z.ZodString;
    output_format: z.ZodString;
    constraints: z.ZodString;
    examples: z.ZodArray<z.ZodObject<{
        input: z.ZodString;
        output: z.ZodString;
        explanation: z.ZodString;
    }, z.core.$strip>>;
    tags: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const codeAnalysisRequestSchema: z.ZodObject<{
    context: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        input_format: z.ZodString;
        output_format: z.ZodString;
        constraints: z.ZodString;
        examples: z.ZodArray<z.ZodObject<{
            input: z.ZodString;
            output: z.ZodString;
            explanation: z.ZodString;
        }, z.core.$strip>>;
        tags: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    code: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=ChallengeAnalysis.d.ts.map