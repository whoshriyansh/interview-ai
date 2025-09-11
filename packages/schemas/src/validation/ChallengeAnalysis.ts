import * as z from "zod";

//TODO: Integrate the context of the problem for more human possible feedback
export const codingChallengeSchema = z.object({
  title: z.string(),
  description: z.string(),
  input_format: z.string(),
  output_format: z.string(),
  constraints: z.string(),
  examples: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
      explanation: z.string(),
    })
  ),
  tags: z.array(z.string()),
});

export const codeAnalysisRequestSchema = z.object({
  context: codingChallengeSchema,
  code: z.string(),
});
