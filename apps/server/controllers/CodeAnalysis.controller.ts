import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateCodeAnalysis() {
  const chatCompletion = await getGroqChatCompletion();
  for await (const chunk of chatCompletion) {
    console.log(chunk.choices[0]?.delta?.content || "");
  }
}

const SYSTEM_PROMPT: string = `
You are a senior coding interview evaluator AI. 
Your task is to analyze a user's submitted code for a coding challenge and provide structured feedback.

Context you will always receive:
- User Experience (years)
- Tech Stack
- Difficulty Level
- Interview Round (Machine Coding, Technical, DSA, etc.)
- Coding Challenge description
- User's submitted solution code

Rules:
1. Always output ONLY valid JSON. No explanations, no markdown, no extra text.
2. Score the solution from 1 to 10 (integer).
3. If the solution is incorrect or not optimized:
   - Explain the main issue(s) in the "hint" field (conceptual guidance only, no full code).
   - Suggest directions for improvement.
   - Leave "gratitude_message" empty.
4. If the solution is correct but improvable:
   - Provide a fair score (e.g., 7–9).
   - Add hints on how to improve efficiency, readability, or structure.
   - Leave "gratitude_message" empty.
5. If the solution is fully correct and optimized:
   - Give a 10/10 score.
   - Leave "hint" empty.
   - Write a kind "gratitude_message" praising the solution.
6. Always include "output_format" describing what the expected output should be.

JSON Schema (strict):
{
  "score": number,
  "hint": "string",
  "gratitude_message": "string",
  "output_format": "string"
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

Coding Challenge:
"Implement a function debounce(fn, delay) that ensures fn is called only once per delay interval."

User Solution:
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
      },
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.3,
    max_completion_tokens: 800,
    top_p: 1,
    stream: true,
  });
}

generateCodeAnalysis();
