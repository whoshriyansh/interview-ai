import Groq from "groq-sdk";
import type { Response, Request } from "express";
//TODO: Fix the path
import { challengeRequestSchema } from "@repo/schemas/validation/ChallengeRequest";
import { errorResponse, successResponse } from "../response/ApiResponse.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateCodingChallenge = async (req: Request, res: Response) => {
  try {
    const parsed = challengeRequestSchema.safeParse(req.body);

    if (!parsed.success) {
      return errorResponse(res, 400, "Invalid Input", parsed.error.format());
    }

    const { experience, techStack, difficulty, purpose } = parsed.data;

    const USER_PROMPT = `Experience: ${experience} Years
Tech Stack: ${techStack.join(", ")}
Difficulty: ${difficulty}
Purpose: ${purpose}

Generate a coding challenge for me to solve.`;

    const chatCompletion = await getGroqChatCompletion(USER_PROMPT);
    const content = chatCompletion.choices[0]?.message?.content;

    let challenge;
    try {
      challenge = JSON.parse(content || "{}");
    } catch (e) {
      return errorResponse(res, 500, "Invalid JSOn from AI", {
        error: "Invalid JSON from AI",
        raw: content,
      });
    }

    return successResponse(res, 201, "Coding Challenge Generated", challenge);
  } catch (error: any) {
    console.error(error);
    return errorResponse(res, 500, "Something went wrong", error.message);
  }
};

const SYSTEM_PROMPT: string = `
You are a coding problem generator AI. 
Your job is to create coding challenges tailored to the user’s:
- Experience
- Tech Stack
- Difficulty Level
- Interview Round (Machine Coding, Technical, DSA, etc.)

Rules:
1. Output ONLY valid JSON.
2. Do not include explanations, markdown, or extra text.
3. Follow this exact JSON schema:

{
  "title": "string - short descriptive title",
  "description": "string - clear problem statement",
  "input_format": "string - expected input description",
  "output_format": "string - expected output description",
  "constraints": "string - list of constraints",
  "examples": [
    {
      "input": "string - example input",
      "output": "string - expected output for that input",
      "explanation": "string - short explanation of why this is the output"
    }
  ],
  "tags": ["array", "recursion", "dynamic-programming"] // relevant CS/tech tags
}
`;

const getGroqChatCompletion = async (userContent: string) => {
  return groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: userContent,
      },
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.7,
    max_completion_tokens: 800,
    top_p: 1,
    stream: false,
  });
};

export default generateCodingChallenge;
