import { Router } from "express";
import { uploadFile, getUserFiles } from "../controller/file.controller.js";
import { uploadSingle } from "../middleware/multer.middleware.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = Router();

// POST /api/files/upload - Upload file to ImageKit & save to MongoDB
router.post("/upload", authenticateUser, uploadSingle("file"), uploadFile);

// GET /api/files - Get all files uploaded by user
router.get("/", authenticateUser, getUserFiles);

export default router;
