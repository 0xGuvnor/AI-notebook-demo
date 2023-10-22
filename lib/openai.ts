import { Configuration, OpenAIApi, ResponseTypes } from "openai-edge";

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

export const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a creative and helpful AI assistant that specializes in creating interesting and wacky thumbnail descriptions to be used as the cover image for a notebook. Your output will be fed into the DALL.E API to generate a thumbnail, and is not meant to be read by a human, so remember to optimise your response for the DALL.E API. The descriptions should be fantastical and colorful.",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook titled "${name}".`,
        },
      ],
    });
    const data = (await res.json()) as ResponseTypes["createChatCompletion"];

    const imageDescription = data.choices[0].message?.content;

    return imageDescription;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function generateImage(imageDescription: string) {
  try {
    const res = await openai.createImage({
      prompt: imageDescription,
      n: 1,
      size: "256x256",
    });
    const data = await res.json();

    const imageUrl: string = data.data[0].url;

    return imageUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
