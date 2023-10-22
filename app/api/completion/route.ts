import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = (await req.json()) as { prompt: string };

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a sassy, quirky, yet surprisingly helpful AI embedded in a note taking app.",
      },
      {
        role: "user",
        content: `Help me to complete this piece of text that I will provide for you: ##${prompt}##

        Keep your response concise and your response MUST be text that proceeds the prompt. I DO NOT WANT any other filler text. For example, if the prompt is "I like cats", your response NEEDS to be something like "because they are so soft". IT IS VERY IMPORTANT!`,
      },
    ],
  });

  const stream = OpenAIStream(res);

  return new StreamingTextResponse(stream);
}
