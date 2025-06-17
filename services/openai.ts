import OpenAI from "openai";

export function getOpenAIClient() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://xiaoai.plus/v1",
  });

  return openai;
}
