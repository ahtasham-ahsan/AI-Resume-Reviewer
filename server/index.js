import express from "express";
import dotenv from "dotenv";
import resumeRoutes from "./routes/resumeRoute.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/api/resume", resumeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

