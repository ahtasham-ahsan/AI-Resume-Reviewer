console.log("Resume Route");
import express from "express";
import fs from "fs";
import path from "path";
import { resumeGraph } from "../graphs/resumeGraph.js";
import { parsePDF } from "../utils/parsePDF.js";

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    if (!req.files || !req.files.resume) {
      return res.status(400).json({ error: "No resume file uploaded." });
    }

    const resumeFile = req.files.resume;
    const filePath = path.join("uploads", resumeFile.name);

    await resumeFile.mv(filePath);

    const resumeText = await parsePDF(filePath);

    const result = await resumeGraph.invoke({ resumeText });

    fs.unlinkSync(filePath);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.json({
      sections: result.sections,
      feedback: result.feedback,
      suggestions: result.suggestions,
    });
  } catch (error) {
    console.error("Error in resume upload:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
