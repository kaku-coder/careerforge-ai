import { getMistralChatModel } from "../resume_services/resumeAi.js";
import buildCareerRoadmapSystemPrompt, {
    buildCareerConversationPrompt,
    buildProfileContextPrompt
} from "../../prompts/careerRoadmapPrompt.js";

/**
 * Helper to strip markdown fences / find the first JSON object in an AI
 * response so we can safely JSON.parse it.
 */
export const parseCareerJson = (content) => {
    const text = typeof content === "string" ? content : String(content ?? "");

    // Strip any triple-backtick code fences
    const noFences = text.replace(/```(?:json)?/gi, "").trim();

    const start = noFences.indexOf("{");
    const end = noFences.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
        throw new Error("AI did not return a valid JSON response.");
    }

    const jsonStr = noFences.slice(start, end + 1);
    return JSON.parse(jsonStr);
};

/**
 * Normalize / validate the raw AI payload into a safe, consistent shape.
 */
const normalizeAiPayload = (raw) => {
    const roadmap = Array.isArray(raw.roadmap)
        ? raw.roadmap
              .filter((item) => item && typeof item === "object")
              .map((item, i) => {
                  const statusValues = ["completed", "current", "next", "upcoming", "goal"];
                  const priorityValues = ["low", "medium", "high"];
                  let status = String(item.status || "upcoming").toLowerCase();
                  if (!statusValues.includes(status)) status = "upcoming";
                  let priority = String(item.priority || "medium").toLowerCase();
                  if (!priorityValues.includes(priority)) priority = "medium";

                  return {
                      title: String(item.title || `Step ${i + 1}`).trim(),
                      description: String(item.description || ""),
                      status,
                      priority,
                      estimatedDays: Math.max(0, Math.round(Number(item.estimatedDays) || 0)),
                      skills: Array.isArray(item.skills) ? item.skills.map(String) : [],
                      prerequisites: Array.isArray(item.prerequisites)
                          ? item.prerequisites.map(String)
                          : [],
                      whyNext: String(item.whyNext || ""),
                      interviewImportance: String(item.interviewImportance || "Medium"),
                      projectSuggestion: String(item.projectSuggestion || ""),
                      order: i
                  };
              })
        : [];

    const profileUpdate = raw.profileUpdate && typeof raw.profileUpdate === "object"
        ? raw.profileUpdate
        : null;

    const currentSkills = Array.isArray(profileUpdate?.currentSkills)
        ? profileUpdate.currentSkills
              .filter((s) => s && s.name)
              .map((s) => ({
                  name: String(s.name).trim(),
                  level: ["beginner", "intermediate", "advanced"].includes(
                      String(s.level).toLowerCase()
                  )
                      ? String(s.level).toLowerCase()
                      : "intermediate"
              }))
        : [];

    const projects = Array.isArray(profileUpdate?.projects)
        ? profileUpdate.projects
              .filter((p) => p && p.name)
              .map((p) => ({
                  name: String(p.name).trim(),
                  description: String(p.description || ""),
                  technologies: Array.isArray(p.technologies)
                      ? p.technologies.map(String)
                      : []
              }))
        : [];

    const weakAreas = Array.isArray(profileUpdate?.weakAreas)
        ? profileUpdate.weakAreas.map(String).filter(Boolean)
        : [];

    const clampNum = (n, fallback) => {
        const v = Number(n);
        return Number.isFinite(v) ? v : fallback;
    };

    const profile = profileUpdate
        ? {
              targetRole: profileUpdate.targetRole != null ? String(profileUpdate.targetRole) : null,
              currentLevel: profileUpdate.currentLevel != null ? String(profileUpdate.currentLevel) : null,
              experience: profileUpdate.experience != null ? String(profileUpdate.experience) : null,
              goal: profileUpdate.goal != null ? String(profileUpdate.goal) : null,
              dailyLearningTime: clampNum(profileUpdate.dailyLearningTime, null),
              deadline: profileUpdate.deadline != null ? String(profileUpdate.deadline) : null,
              currentSkills,
              projects,
              weakAreas
          }
        : null;

    const progress = Math.max(0, Math.min(100, Math.round(Number(raw.progress) || 0)));

    return {
        assistantMessage: String(raw.assistantMessage || "").trim(),
        needsMoreInfo: Boolean(raw.needsMoreInfo),
        profile,
        roadmap,
        progress
    };
};

/**
 * Main AI call. Builds the prompt from the stored conversation + profile,
 * sends to Mistral, normalizes & returns the structured payload.
 */
export const runCareerCoach = async ({ conversation, profile }) => {
    const chatModel = getMistralChatModel();

    const systemPrompt = buildCareerRoadmapSystemPrompt();
    const conversationContext = buildCareerConversationPrompt(conversation);
    const profileContext = buildProfileContextPrompt(profile);

    const userPrompt = [
        profileContext,
        "",
        conversationContext,
        "",
        "Based on the conversation and profile above, collect any missing information conversationally or build/refine the roadmap. Return ONLY the structured JSON."
    ].join("\n");

    const response = await chatModel.invoke([
        ["system", systemPrompt],
        ["user", userPrompt]
    ]);

    const raw = parseCareerJson(response.content);
    return normalizeAiPayload(raw);
};

export default { runCareerCoach, parseCareerJson };
