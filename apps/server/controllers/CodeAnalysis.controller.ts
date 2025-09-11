import Groq from "groq-sdk";
import type { Response, Request } from "express";
import dotenv from "dotenv";
//TODO: Fix the path as it will just waste the concept of turbo repo
import { codeAnalysisRequestSchema } from "../../../packages/schemas/src/validation/ChallengeAnalysis.ts";
import { errorResponse, successResponse } from "../response/ApiResponse.ts";

dotenv.config({ path: ".env" });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateCodeAnalysis = async (req: Request, res: Response) => {
  try {
    const parsed = codeAnalysisRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      return errorResponse(res, 400, "Invalid Input", parsed.error.format());
    }

    const { context, code } = req.body;

    const USER_PROMPT = `Context: ${context}
Coded Solution: ${code}

Generate the Analyses on the solution based on context.`;

    const chatCompletion = await getGroqChatCompletion(USER_PROMPT);
    const content = chatCompletion.choices[0]?.message?.content;
    let analyses;

    try {
      analyses = JSON.parse(content || "{}");
    } catch (error) {
      return errorResponse(res, 500, "Invalid JSOn from AI", {
        error: "Invalid JSON from AI",
        raw: content,
      });
    }

    return successResponse(res, 201, "Analysis Generated", analyses);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Something went wrong", error.message);
  }
};

const SYSTEM_PROMPT: string = `
You are a senior coding interview evaluator AI. 
Your task is to analyze a user's submitted code for a coding challenge and provide structured feedback.

Input:
- A coding challenge (JSON object with title, description, input_format, output_format, constraints, examples, tags).
- A user's submitted solution (string).

Rules:
1. Always output ONLY valid JSON. No explanations, no markdown, no text outside JSON.
2. Your output must strictly match this schema:
{
  "score": number,                   // integer from 1 to 10
  "hint": "string",                  // guidance if incorrect or improvable, empty if perfect
  "gratitude_message": "string",     // praise only if correct, otherwise empty
  "output_format": "string"          // describe what the correct output should be
}
3. If the solution is incorrect or unoptimized:
   - Provide a score from 1–6.
   - Add conceptual hints in "hint".
   - Leave "gratitude_message" empty.
4. If the solution is correct but improvable:
   - Provide a score from 7–9.
   - Add hints on efficiency, readability, or structure.
   - Write a short "gratitude_message" encouraging the user.
5. If the solution is fully correct and optimized:
   - Provide a score of 10.
   - Leave "hint" empty.
   - Write a kind "gratitude_message" praising the solution.
6. Never include any fields other than those in the schema.
7. If unsure, return an empty JSON object {}.
}
`;

const getGroqChatCompletion = async (USER_PROMPT: string) => {
  return groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: USER_PROMPT,
      },
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.3,
    max_completion_tokens: 800,
    top_p: 1,
    stream: false,
  });
};

export default generateCodeAnalysis;
