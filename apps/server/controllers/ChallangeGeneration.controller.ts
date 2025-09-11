import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateCodingChallenge() {
  const chatCompletion = await getGroqChatCompletion();
  for await (const chunk of chatCompletion) {
    console.log(chunk.choices[0]?.delta?.content || "");
  }
}

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

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Experience: 2 Years
Tech Stack: JavaScript, React, Node.js
Difficulty: Medium
Purpose: Machine Coding Round

Generate a coding challenge for me to solve.`,
      },
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.7,
    max_completion_tokens: 800,
    top_p: 1,
    stream: true,
  });
}

generateCodingChallenge();
