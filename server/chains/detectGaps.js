import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const defaultPrompt = `You are an expert resume reviewer. Review the resume sections and highlight any gaps or issues that may affect a job application for any position according to his education and experience. Note: Overlap between career (such as jobs or internships) and education can happen, e.g., a person may work or intern during their studies. Do not flag this as an issue.`;

export const detectGaps = async (state) => {
  const llm = new ChatOpenAI({ model: "gpt-4" });
  const prompt = new PromptTemplate({
    inputVariables: ["sections", "customPrompt"],
    template: `{customPrompt}\n\nHere are the resume sections:\n{sections}`,
  });

  const chain = prompt.pipe(llm);

  const response = await chain.invoke({
    sections: JSON.stringify(state.sections, null, 2),
    customPrompt: state.customPrompt || defaultPrompt,
  });

  return { feedback: response.content };
};
