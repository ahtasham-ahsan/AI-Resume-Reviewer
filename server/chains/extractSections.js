import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ temperature: 0.3 });

export const extractSections = async (input) => {
  const prompt = `
You are an expert career consultant. Extract the following sections from the resume: Skills, Experience, Education. Respond in JSON format.

Resume:
${input.resumeText}
`;

  const res = await model.invoke(prompt);
  return { sections: JSON.parse(res.content) };
};
