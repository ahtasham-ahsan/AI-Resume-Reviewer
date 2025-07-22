// import { StateGraph } from "@langchain/langgraph";
// import { extractSections } from "../chains/extractSections.js";
// import { detectGaps } from "../chains/detectGaps.js";
// import { generateSuggestions } from "../chains/generateSuggestions.js";

// const builder = new StateGraph()
//   .addNode("extract", extractSections)
//   .addNode("detect", detectGaps)
//   .addNode("suggest", generateSuggestions)
//   .addEdge("extract", "detect")
//   .addEdge("detect", "suggest")
//   .setEntryPoint("extract");

// export const resumeGraph = builder.compile();

import { z } from "zod";
import { StateGraph } from "@langchain/langgraph";
import { extractSections } from "../chains/extractSections.js";
import { detectGaps } from "../chains/detectGaps.js";
import { generateSuggestions } from "../chains/generateSuggestions.js";

// ✅ Define the state schema using Zod
const schema = z.object({
  resumeText: z.string().optional(),
  sections: z.any().optional(),
  feedback: z.string().optional(),
  suggestions: z.string().optional(),
});

// ✅ Pass the schema to StateGraph
const builder = new StateGraph(schema)
  .addNode("extract", extractSections)
  .addNode("detect", detectGaps)
  .addNode("suggest", generateSuggestions)
  .addEdge("extract", "detect")
  .addEdge("detect", "suggest")
  .setEntryPoint("extract");

export const resumeGraph = builder.compile();
