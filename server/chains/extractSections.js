import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ temperature: 0.3 });

export const extractSections = async (input) => {
  const prompt = `
You are an expert career consultant. First, determine if the provided text is a valid resume. If it is not a resume, respond with: {\"error\": \"The provided document is not a valid resume.\"} and do not attempt to extract sections. Otherwise, extract the following sections from the resume: Skills, Experience, Education. Also, based on the resume content and (if provided) the job title, suggest a list of RecommendedSkills that the candidate should consider adding to improve their chances. Respond in JSON format with keys: Skills, Experience, Education, RecommendedSkills.

Note: Overlap between career (such as jobs or internships) and education can happen, e.g., a person may work or intern during their studies. Do not flag this as an issue in your suggestions or feedback.

Resume:
${input.resumeText}
`;

  const res = await model.invoke(prompt);
  let parsed;
  try {
    parsed = JSON.parse(res.content);
  } catch (e) {
    parsed = { error: "Failed to parse LLM response." };
  }
  if (parsed.error) {
    return { error: parsed.error };
  }
  return { sections: parsed };
};
