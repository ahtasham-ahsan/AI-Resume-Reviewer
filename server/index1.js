import dotenv from "dotenv";
dotenv.config();

import { resumeGraph } from "./graphs/resumeGraph.js";
import { parsePDF } from "./utils/parsePDF.js";

const run = async () => {
  try {
    const resumeText = await parsePDF("q.pdf");
    const result = await resumeGraph.invoke({ resumeText });
    console.log("🔍 Extracted Sections:\n", result.sections);
    console.log("\n⚠️ Feedback:\n", result.feedback);
    console.log("\n✅ Suggestions:\n", result.suggestions);
  } catch (error) {
    console.error("Error during execution:", error);
  }
};

run();