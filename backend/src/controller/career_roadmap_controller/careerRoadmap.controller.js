import CareerRoadmapModel from "../../schema/career_roadmap/careerRoadmap.schema.model.js";
import ResumeModel from "../../schema/resume_schema/resume.schema.model.js";
import { runCareerCoach } from "../../services/career_roadmap_services/careerRoadmapAI.js";

const MAX_MESSAGE_LENGTH = 2000;

const asProfileContext = (doc) => {
    if (!doc) return null;
    return {
        targetRole: doc.targetRole || null,
        currentLevel: doc.currentLevel || null,
        experience: doc.experience || null,
        goal: doc.goal || null,
        dailyLearningTime: doc.dailyLearningTime || null,
        deadline: doc.deadline || null,
        currentSkills: doc.currentSkills || [],
        projects: doc.projects || [],
        weakAreas: doc.weakAreas || []
    };
};

const experienceKeyInfo = (doc) => {
    if (!doc) return "";
    const message = "Welcome! I'm your AI Career Coach. I'll ask a few questions to understand your current level and career goal, then build a personalized roadmap for you.\n\nLet's start. What role are you targeting?";
    return message;
};

const responsePayload = (doc, extra = {}) => {
    const currentItem = doc.roadmap.find((r) => r.status === "current") || null;
    return {
        chat: {
            message: null,
            conversation: doc.conversation || []
        },
        profile: {
            targetRole: doc.targetRole,
            currentLevel: doc.currentLevel,
            experience: doc.experience,
            goal: doc.goal,
            dailyLearningTime: doc.dailyLearningTime,
            deadline: doc.deadline,
            skills: doc.currentSkills || [],
            projects: doc.projects || [],
            weakAreas: doc.weakAreas || []
        },
        roadmap: {
            progress: doc.progress,
            currentStep: currentItem ? currentItem.title : doc.currentStep,
            items: doc.roadmap || []
        },
        ...extra
    };
};

/**
 * GET /api/career-roadmap
 * Returns the existing roadmap for the authenticated user (or a starter flag).
 */
export const getCareerRoadmap = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const doc = await CareerRoadmapModel.findOne({ userId });

        if (!doc) {
            return res.status(200).json({
                success: true,
                data: {
                    started: false,
                    ...responsePayload({ conversation: [], currentSkills: [], projects: [], weakAreas: [], roadmap: [], progress: 0, targetRole: "", currentLevel: "", experience: "", goal: "", dailyLearningTime: 0, deadline: "" })
                }
            });
        }

        return res.status(200).json({ success: true, data: responsePayload(doc) });
    } catch (error) {
        console.error("Get Career Roadmap Error:", error);
        return res.status(500).json({ success: false, message: "Failed to load roadmap", error: error.message });
    }
};

/**
 * POST /api/career-roadmap
 * Creates/initializes a roadmap for the authenticated user, seeded with resume context.
 */
export const createCareerRoadmap = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const existing = await CareerRoadmapModel.findOne({ userId });
        if (existing) {
            return res.status(200).json({ success: true, data: responsePayload(existing) });
        }

        const doc = await CareerRoadmapModel.create({
            userId,
            conversation: [
                {
                    role: "assistant",
                    content: experienceKeyInfo(null)
                }
            ]
        });

        return res.status(201).json({
            success: true,
            data: responsePayload(doc)
        });
    } catch (error) {
        console.error("Create Career Roadmap Error:", error);
        return res.status(500).json({ success: false, message: "Failed to create roadmap", error: error.message });
    }
};

/**
 * POST /api/career-roadmap/chat
 * Body: { message }
 * Appends the user message, streams through the AI coach, merges extracted
 * profile + roadmap, persists, and returns updated state.
 */
export const chatCareerRoadmap = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const rawMessage = (req.body && req.body.message) || "";
        const message = String(rawMessage).trim();

        if (!message) {
            return res.status(400).json({ success: false, message: "Message cannot be empty." });
        }
        if (message.length > MAX_MESSAGE_LENGTH) {
            return res.status(400).json({ success: false, message: `Message too long (max ${MAX_MESSAGE_LENGTH} chars).` });
        }

        let doc = await CareerRoadmapModel.findOne({ userId });
        if (!doc) {
            doc = await CareerRoadmapModel.create({
                userId,
                conversation: []
            });
        }

        // Resume context for the AI (best effort, do not block on failure)
        let resumeText = null;
        try {
            const latestResume = await ResumeModel.findOne({ user: userId }).sort({ createdAt: -1 });
            if (latestResume && latestResume.extractedText) {
                resumeText = latestResume.extractedText.slice(0, 6000);
            }
        } catch (err) {
            console.warn("Resume context fetch warning:", err.message);
        }

        // Persist user message
        doc.conversation.push({ role: "user", content: message });

        const profileContext = asProfileContext(doc);

        let aiResult;
        try {
            aiResult = await runCareerCoach({
                conversation: doc.conversation,
                profile: profileContext
            });
        } catch (aiError) {
            console.error("AI Career Coach Error:", aiError);
            // Keep the user message saved but respond gracefully
            await doc.save();
            return res.status(502).json({
                success: false,
                message: "AI service is temporarily unavailable. Please try again.",
                error: aiError.message
            });
        }

        // Persist AI assistant reply
        doc.conversation.push({
            role: "assistant",
            content: aiResult.assistantMessage || "Got it. Let's keep going."
        });

        // Merge profile updates
        const p = aiResult.profile;
        if (p) {
            if (p.targetRole != null && String(p.targetRole).trim()) doc.targetRole = String(p.targetRole).trim();
            if (p.currentLevel != null && String(p.currentLevel).trim()) doc.currentLevel = String(p.currentLevel).trim();
            if (p.experience != null && String(p.experience).trim()) doc.experience = String(p.experience).trim();
            if (p.goal != null && String(p.goal).trim()) doc.goal = String(p.goal).trim();
            if (p.dailyLearningTime != null && Number.isFinite(p.dailyLearningTime)) doc.dailyLearningTime = p.dailyLearningTime;
            if (p.deadline != null && String(p.deadline).trim()) doc.deadline = String(p.deadline).trim();

            // Merge skills (add new ones, avoid duplicates)
            if (Array.isArray(p.currentSkills) && p.currentSkills.length) {
                const existing = new Set((doc.currentSkills || []).map((s) => s.name.toLowerCase()));
                for (const s of p.currentSkills) {
                    const name = s.name.toLowerCase();
                    if (!existing.has(name)) {
                        doc.currentSkills.push(s);
                        existing.add(name);
                    }
                }
            }

            if (Array.isArray(p.projects) && p.projects.length) {
                const existing = new Set((doc.projects || []).map((pr) => pr.name.toLowerCase()));
                for (const pr of p.projects) {
                    if (!existing.has(pr.name.toLowerCase())) {
                        doc.projects.push(pr);
                        existing.add(pr.name.toLowerCase());
                    }
                }
            }

            if (Array.isArray(p.weakAreas) && p.weakAreas.length) {
                const existing = new Set((doc.weakAreas || []).map((w) => w.toLowerCase()));
                for (const w of p.weakAreas) {
                    if (!existing.has(w.toLowerCase())) doc.weakAreas.push(w);
                }
            }
        }

        // Only replace the roadmap when AI returned new items
        if (aiResult.roadmap && aiResult.roadmap.length > 0) {
            doc.roadmap = aiResult.roadmap;
        }
        if (Number.isFinite(aiResult.progress)) {
            doc.progress = Math.max(0, Math.min(100, Math.round(aiResult.progress)));
        }

        // Derive current step label
        const currentItem = doc.roadmap.find((r) => r.status === "current");
        doc.currentStep = currentItem ? currentItem.title : (doc.roadmap[0]?.title || "");

        await doc.save();

        return res.status(200).json({
            success: true,
            data: {
                ...responsePayload(doc),
                chat: {
                    message: aiResult.assistantMessage,
                    conversation: doc.conversation
                }
            }
        });
    } catch (error) {
        console.error("Chat Career Roadmap Error:", error);
        return res.status(500).json({ success: false, message: "Failed to process message", error: error.message });
    }
};

/**
 * PATCH /api/career-roadmap/:itemId
 * Body: { status }  (e.g. "completed")
 * Marks a roadmap item as completed and advances the "current" pointer.
 */
export const updateRoadmapItem = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const { itemId } = req.params;
        const { status } = req.body || {};

        if (!itemId) {
            return res.status(400).json({ success: false, message: "Item id is required." });
        }
        const newStatus = String(status || "completed");
        if (!["completed", "current", "next", "upcoming", "goal"].includes(newStatus)) {
            return res.status(400).json({ success: false, message: "Invalid status value." });
        }

        const doc = await CareerRoadmapModel.findOne({ userId });
        if (!doc) {
            return res.status(404).json({ success: false, message: "No roadmap found." });
        }

        const item = doc.roadmap.id(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: "Roadmap item not found." });
        }

        const wasCurrent = item.status === "current";
        item.status = newStatus;

        // If we just completed the current item, advance the pointer to the first
        // non-completed, non-goal item.
        if (newStatus === "completed") {
            const sorted = [...doc.roadmap].sort((a, b) => a.order - b.order);
            const currentIdx = sorted.findIndex((it) => String(it._id) === String(itemId));
            let nextIdx = currentIdx + 1;
            while (nextIdx < sorted.length && sorted[nextIdx].status === "completed") nextIdx++;
            if (nextIdx < sorted.length && sorted[nextIdx].status !== "goal") {
                sorted[nextIdx].status = "current";
            }
            void wasCurrent;
        }

        // Recompute progress: count completed + goal vs total non-goal items
        const total = doc.roadmap.length;
        const completed = doc.roadmap.filter(
            (it) => it.status === "completed" || it.status === "goal"
        ).length;
        doc.progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        const currentItem = doc.roadmap.find((r) => r.status === "current");
        doc.currentStep = currentItem ? currentItem.title : (doc.roadmap[0]?.title || "");

        await doc.save();

        return res.status(200).json({ success: true, data: responsePayload(doc) });
    } catch (error) {
        console.error("Update Roadmap Item Error:", error);
        return res.status(500).json({ success: false, message: "Failed to update item", error: error.message });
    }
};

/**
 * POST /api/career-roadmap/regenerate
 * Forces the AI to regenerate the roadmap from the current stored profile.
 */
export const regenerateCareerRoadmap = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const doc = await CareerRoadmapModel.findOne({ userId });
        if (!doc) {
            return res.status(404).json({ success: false, message: "No roadmap to regenerate." });
        }

        const profileContext = asProfileContext(doc);
        let aiResult;
        try {
            aiResult = await runCareerCoach({
                conversation: doc.conversation,
                profile: profileContext
            });
        } catch (aiError) {
            console.error("Regenerate AI Error:", aiError);
            return res.status(502).json({
                success: false,
                message: "AI service is temporarily unavailable. Please try again.",
                error: aiError.message
            });
        }

        if (aiResult.roadmap && aiResult.roadmap.length > 0) {
            doc.roadmap = aiResult.roadmap;
        }
        if (aiResult.assistantMessage) {
            doc.conversation.push({
                role: "assistant",
                content: aiResult.assistantMessage
            });
        }
        if (Number.isFinite(aiResult.progress)) {
            doc.progress = Math.max(0, Math.min(100, Math.round(aiResult.progress)));
        }

        const currentItem = doc.roadmap.find((r) => r.status === "current");
        doc.currentStep = currentItem ? currentItem.title : (doc.roadmap[0]?.title || "");

        await doc.save();

        return res.status(200).json({ success: true, data: responsePayload(doc) });
    } catch (error) {
        console.error("Regenerate Career Roadmap Error:", error);
        return res.status(500).json({ success: false, message: "Failed to regenerate roadmap", error: error.message });
    }
};
