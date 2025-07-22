import dotenv from "dotenv";
dotenv.config();

import { detectGaps } from "./chains/detectGaps.js";

const input = {
  sections: {
    Skills: "JavaScript, Python, HTML",
    Experience: "Worked at Google and Meta",
    Education: "BSc Computer Science"
  }
};

const run = async () => {
  const result = await detectGaps(input);
  console.log(result);
};

run();
