import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ temperature: 0.3 });

export const detectGaps = async (input) => {
  const prompt = `
Given these resume sections:
${JSON.stringify(input.sections, null, 2)}

Analyze and identify weak or missing sections. Suggest improvements.
Respond in bullet points.
`;

  const res = await model.invoke(prompt);
  return { feedback: res.content };
};
