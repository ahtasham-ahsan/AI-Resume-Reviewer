import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ temperature: 0.3 });

export const extractSections = async (input) => {
  const prompt = `
You are an expert career consultant. Extract the following sections from the resume: Skills, Experience, Education. Also, based on the resume content and (if provided) the job title, suggest a list of RecommendedSkills that the candidate should consider adding to improve their chances. Respond in JSON format with keys: Skills, Experience, Education, RecommendedSkills.

Resume:
${input.resumeText}
`;

  const res = await model.invoke(prompt);
  return { sections: JSON.parse(res.content) };
};
