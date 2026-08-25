import { Router } from "express";
import {
    processResumePdf,
    askResumeQuestionController,
    askMistralController,
    askAnthropicController,
    compareModelsController,
    getUserResumes
} from "../controller/resume.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

// POST /api/resume/parse - Upload, parse PDF resume & save to MongoDB
router.post("/parse", upload.single("file"), processResumePdf);

// Dedicated AI Model Testing Endpoints:
// 1. Mistral AI URL:
router.post("/ask/mistral", askMistralController);

// 2. Anthropic Claude URL:
router.post("/ask/anthropic", askAnthropicController);

// 3. Side-by-Side Model Comparison URL:
router.post("/ask/compare", compareModelsController);

// Universal Q&A endpoint (accepts { provider: "mistral" | "anthropic" | "both" })
router.post("/ask", askResumeQuestionController);

// GET /api/resume - Get all saved resumes
router.get("/", getUserResumes);

export default router;
