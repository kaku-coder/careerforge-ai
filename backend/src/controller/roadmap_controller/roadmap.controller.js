import RoadmapModel from "../../schema/roadmap_data/roadmap.schema.model.js";
import { generateRoadmapChatResponse } from "../../services/roadmap_services/roadmapAi.js";

/**
 * POST /api/roadmap/chat
 * Send a message to Roadmap AI & store conversation history
 */
export const handleRoadmapChat = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user?._id;

        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message text is required"
            });
        }

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User authentication required"
            });
        }

        // Find existing roadmap chat document or create a new one
        let roadmapDoc = await RoadmapModel.findOne({ user: userId });

        if (!roadmapDoc) {
            roadmapDoc = new RoadmapModel({
                user: userId,
                messages: []
            });
        }

        // Push user message into history
        roadmapDoc.messages.push({
            sender: "user",
            text: message.trim()
        });

        // Call Groq AI Service with full chat history context
        const aiReply = await generateRoadmapChatResponse(roadmapDoc.messages);

        // Push AI response into history
        roadmapDoc.messages.push({
            sender: "ai",
            text: aiReply
        });

        // Save updated chat document in MongoDB
        await roadmapDoc.save();

        return res.status(200).json({
            success: true,
            aiResponse: aiReply,
            messages: roadmapDoc.messages
        });
    } catch (error) {
        console.error("Error in handleRoadmapChat:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to process roadmap AI response",
            error: error.message
        });
    }
};

/**
 * GET /api/roadmap/history
 * Get chat history for logged in user
 */
export const getRoadmapHistory = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User authentication required"
            });
        }

        const roadmapDoc = await RoadmapModel.findOne({ user: userId });

        return res.status(200).json({
            success: true,
            messages: roadmapDoc ? roadmapDoc.messages : []
        });
    } catch (error) {
        console.error("Error in getRoadmapHistory:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch chat history",
            error: error.message
        });
    }
};

/**
 * DELETE /api/roadmap/clear
 * Clear chat history for logged in user
 */
export const clearRoadmapHistory = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User authentication required"
            });
        }

        await RoadmapModel.findOneAndDelete({ user: userId });

        return res.status(200).json({
            success: true,
            message: "Roadmap chat history cleared successfully"
        });
    } catch (error) {
        console.error("Error in clearRoadmapHistory:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to clear chat history",
            error: error.message
        });
    }
};
