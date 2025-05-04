import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { content, numberOfQuestions, difficulty, topic } = await req.json();

  const result = await streamText({
    model: google("gemini-1.5-flash-latest"),
    messages: [
      {
        role: "system",
        content: `You are an expert at creating educational questions and answers. 
        Generate clear, engaging questions with detailed, accurate answers.
        Format each Q&A pair clearly with numbers and separate sections for questions and answers.`,
      },
      {
        role: "user",
        content: `Generate ${numberOfQuestions} ${difficulty}-level questions and answers ${
          content
            ? "based on the following content:\n\n" + content
            : "about the topic: " + topic
        }

        Requirements:
        1. Questions should be thought-provoking and appropriate for the ${difficulty} difficulty level
        2. Answers should be comprehensive and educational
        3. Include a mix of question types (e.g., conceptual, analytical, application-based)
        4. Format the output clearly with numbered questions and corresponding answers
        5. For each answer, provide a brief explanation of why it's correct
        
        Format example:
        Questions:
        1. [Question 1]
        2. [Question 2]
        ...

        Answers:
        1. [Answer 1]
        Explanation: [Why this is the correct answer]
        
        2. [Answer 2]
        Explanation: [Why this is the correct answer]
        ...`,
      },
    ],
  });

  return result.toDataStreamResponse();
}
