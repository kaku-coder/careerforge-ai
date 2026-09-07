import { Router } from "express";
import {
    handleRoadmapChat,
    getRoadmapHistory,
    clearRoadmapHistory
} from "../controller/roadmap_controller/roadmap.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { generateRoadmapChatResponse } from "../services/roadmap_services/roadmapAi.js";

const router = Router();

// Test Endpoint (No Auth Required - for quick testing in Postman/Thunder Client)
// POST /api/roadmap/test
router.post("/test", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "Please provide a 'message' string in request body." });
        }

        const reply = await generateRoadmapChatResponse([{ sender: "user", text: message }]);
        return res.status(200).json({ success: true, aiResponse: reply });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Authenticated Routes for User Chat App:
// POST /api/roadmap/chat - Send chat message & get AI response
router.post("/chat", authenticateUser, handleRoadmapChat);

// GET /api/roadmap/history - Fetch user's chat history
router.get("/history", authenticateUser, getRoadmapHistory);

// DELETE /api/roadmap/clear - Clear user's chat history
router.delete("/clear", authenticateUser, clearRoadmapHistory);

export default router;
