import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const defaultPrompt = `Provide clear and actionable suggestions to improve the resume based on the identified feedback and skills required for any position according to his education and experience. Note: Overlap between career (such as jobs or internships) and education can happen, e.g., a person may work or intern during their studies. Do not flag this as an issue in your suggestions.`;

export const generateSuggestions = async (state) => {
  const llm = new ChatOpenAI({ model: "gpt-4" });
  const prompt = new PromptTemplate({
    inputVariables: ["feedback", "customPrompt"],
    template: `{customPrompt}\n\nFeedback:\n{feedback}`,
  });

  const chain = prompt.pipe(llm);

  const response = await chain.invoke({
    feedback: state.feedback,
    customPrompt: state.customPrompt || defaultPrompt,
  });

  return { suggestions: response.content };
};
