// import { ChatOpenAI } from "langchain/chat_models/openai";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ temperature: 0.3 });

export const generateSuggestions = async (input) => {
  const prompt = `
Based on this feedback:
${input.feedback}

Generate concrete suggestions to improve the resume.
`;

  const res = await model.invoke(prompt);
  return { suggestions: res.content };
};
