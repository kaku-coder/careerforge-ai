import { Router } from "express";
import { processResumePdf, getUserResumes } from "../controller/resume.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

// POST /api/resume/parse - Upload, parse PDF resume & save to MongoDB
router.post("/parse", upload.single("file"), processResumePdf);

// GET /api/resume - Get all saved resumes
router.get("/", getUserResumes);

export default router;
