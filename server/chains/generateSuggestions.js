import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const defaultPrompt = `The resume will be used to apply for Human Resorce Position. Provide clear and actionable suggestions to improve the resume based on the identified feedback and skills required for the said position.`;

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
