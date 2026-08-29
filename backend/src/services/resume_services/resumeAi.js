import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings, ChatMistralAI } from "@langchain/mistralai";
import { ChatAnthropic } from "@langchain/anthropic";

/**
 * Service to parse text content from a PDF file path or Blob/Buffer
 */
export const parseResumePdf = async (fileInput) => {
    try {
        const loader = new PDFLoader(fileInput);
        const docs = await loader.load();
        return docs;
    } catch (error) {
        console.error("Error in parseResumePdf service:", error);
        throw error;
    }
};

/**
 * Service to split documents or text into smaller chunks
 */
export const splitResumeText = async (input, options = { chunkSize: 500, chunkOverlap: 50 }) => {
    try {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: options.chunkSize || 500,
            chunkOverlap: options.chunkOverlap || 50
        });

        if (Array.isArray(input)) {
            const splitDocs = await splitter.splitDocuments(input);
            return splitDocs;
        } else if (typeof input === "string") {
            const stringChunks = await splitter.splitText(input);
            return stringChunks;
        }
        return [];
    } catch (error) {
        console.error("Error in splitResumeText service:", error);
        throw error;
    }
};

/**
 * Helper to initialize MistralAIEmbeddings instance
 */
export const getMistralEmbeddings = (apiKey = process.env.MISTRAL_API_KEY) => {
    const key = apiKey || process.env.MISTRAL_API_KEY;
    if (!key) {
        throw new Error("MISTRAL_API_KEY is not defined in environment variables.");
    }
    return new MistralAIEmbeddings({
        apiKey: key,
        model: "mistral-embed"
    });
};

/**
 * Generate vector embeddings using Mistral AI
 */
export const embedTextsWithMistral = async (texts, apiKey = process.env.MISTRAL_API_KEY) => {
    try {
        const embeddingsModel = getMistralEmbeddings(apiKey);
        const embeddings = await embeddingsModel.embedDocuments(texts);
        return embeddings;
    } catch (error) {
        console.error("Error generating Mistral text embeddings:", error);
        throw error;
    }
};

/**
 * Generate vector embedding for a query string using Mistral AI
 */
export const embedQueryWithMistral = async (query, apiKey = process.env.MISTRAL_API_KEY) => {
    try {
        const embeddingsModel = getMistralEmbeddings(apiKey);
        const embedding = await embeddingsModel.embedQuery(query);
        return embedding;
    } catch (error) {
        console.error("Error generating Mistral query embedding:", error);
        throw error;
    }
};

/**
 * Helper to initialize ChatMistralAI model instance
 */
export const getMistralChatModel = (modelName = "mistral-small-latest", apiKey = process.env.MISTRAL_API_KEY) => {
    const key = apiKey || process.env.MISTRAL_API_KEY;
    if (!key) {
        throw new Error("MISTRAL_API_KEY is missing in environment variables.");
    }
    return new ChatMistralAI({
        apiKey: key,
        modelName: modelName
    });
};

/**
 * Helper to initialize ChatAnthropic model instance
 */
export const getAnthropicChatModel = (modelName = "claude-3-5-sonnet-20240620", apiKey = process.env.ANTHROPIC_API_KEY) => {
    const key = apiKey || process.env.ANTHROPIC_API_KEY;
    if (!key) {
        throw new Error("ANTHROPIC_API_KEY is missing in environment variables.");
    }
    return new ChatAnthropic({
        apiKey: key,
        modelName: modelName
    });
};

/**
 * Ask a question about candidate's resume using Mistral AI
 */
export const askResumeWithMistral = async (question, resumeContext) => {
    try {
        const chatModel = getMistralChatModel();

        const systemPrompt = `You are CareerForge AI Resume Assistant (powered by Mistral AI). Answer questions about candidate resumes, code reviews, and problem-solving skills accurately based on the provided resume context below.
If the information is missing from the context, state that it's not mentioned in the resume.

--- RESUME CONTEXT ---
${resumeContext}
----------------------`;

        const response = await chatModel.invoke([
            ["system", systemPrompt],
            ["user", question]
        ]);

        return response.content;
    } catch (error) {
        console.error("Error asking Mistral AI:", error);
        throw error;
    }
};

/**
 * Ask a question about candidate's resume using Anthropic Claude
 */
export const askResumeWithAnthropic = async (question, resumeContext) => {
    try {
        const chatModel = getAnthropicChatModel();

        const systemPrompt = `You are CareerForge AI Resume Assistant (powered by Anthropic Claude). Answer questions about candidate resumes, code reviews, and problem-solving skills accurately based on the provided resume context below.
If the information is missing from the context, state that it's not mentioned in the resume.

--- RESUME CONTEXT ---
${resumeContext}
----------------------`;

        const response = await chatModel.invoke([
            ["system", systemPrompt],
            ["user", question]
        ]);

        return response.content;
    } catch (error) {
        console.error("Error asking Anthropic AI:", error);
        throw error;
    }
};

/**
 * Compare responses, code review, and problem solving between Mistral AI and Anthropic Claude
 */
export const compareMistralAndAnthropic = async (question, resumeContext) => {
    const results = {
        question,
        mistral: { provider: "Mistral AI", model: "mistral-small-latest", answer: null, error: null, timeMs: 0 },
        anthropic: { provider: "Anthropic Claude", model: "claude-3-5-sonnet", answer: null, error: null, timeMs: 0 }
    };

    // 1. Query Mistral AI
    const mistralStart = Date.now();
    try {
        results.mistral.answer = await askResumeWithMistral(question, resumeContext);
        results.mistral.timeMs = Date.now() - mistralStart;
    } catch (err) {
        results.mistral.error = err.message;
        results.mistral.timeMs = Date.now() - mistralStart;
    }

    // 2. Query Anthropic Claude
    const anthropicStart = Date.now();
    try {
        results.anthropic.answer = await askResumeWithAnthropic(question, resumeContext);
        results.anthropic.timeMs = Date.now() - anthropicStart;
    } catch (err) {
        results.anthropic.error = err.message;
        results.anthropic.timeMs = Date.now() - anthropicStart;
    }

    return results;
};

/**
 * Extract strict JSON from an AI response (handles markdown code fences)
 */
const parseAtsJson = (content) => {
    const text = typeof content === "string" ? content : String(content ?? "");
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
        throw new Error("AI did not return a valid JSON report.");
    }
    const parsed = JSON.parse(text.slice(start, end + 1));

    // Normalize breakdown (accepts array OR object keyed by category)
    let breakdown = [];
    if (Array.isArray(parsed.breakdown)) {
        breakdown = parsed.breakdown.map(item => ({
            category: item.category || item.name || "Category",
            score: Math.max(0, Math.min(100, Number(item.score) || 0)),
            feedback: item.feedback || ""
        }));
    } else if (parsed.breakdown && typeof parsed.breakdown === "object") {
        breakdown = Object.entries(parsed.breakdown).map(([category, value]) => {
            const item = typeof value === "object" ? value : { score: value };
            return {
                category,
                score: Math.max(0, Math.min(100, Number(item.score) || 0)),
                feedback: item.feedback || ""
            };
        });
    }

    return {
        score: Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0))),
        verdict: parsed.verdict || "",
        estimatedRole: parsed.estimatedRole || parsed.role || "Not detected",
        breakdown,
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths.map(String) : [],
        weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses.map(String) : [],
        matchedKeywords: Array.isArray(parsed.matchedKeywords) ? parsed.matchedKeywords.map(String) : [],
        missingKeywords: Array.isArray(parsed.missingKeywords) ? parsed.missingKeywords.map(String) : [],
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions.map(String) : []
    };
};

/**
 * Analyze a resume for Applicant Tracking System (ATS) compatibility and return a scored report
 */
export const analyzeResumeForAts = async (resumeContext, options = {}) => {
    try {
        const provider = (options.provider || "mistral").toLowerCase();
        const isClaude = provider.includes("anthropic") || provider.includes("claude");
        const chatModel = isClaude ? getAnthropicChatModel() : getMistralChatModel();

        const targetRole = (options.targetRole || "").trim() || "Not specified (auto-detect from resume)";
        const jobDescription = (options.jobDescription || "").trim() || "Not provided (judge against general ATS best practices)";

        const truncatedContext = resumeContext.length > 12000
            ? resumeContext.slice(0, 12000) + "\n...[truncated]"
            : resumeContext;

        const systemPrompt = `You are a senior ATS (Applicant Tracking System) expert and resume coach for CareerForge AI.
Analyze the given resume for ATS compatibility and return ONLY a valid JSON object. Do not include prose, explanations, or markdown code fences — output raw JSON only.

Use exactly this JSON shape:
{
  "score": <integer 0-100>,
  "verdict": "one short line overall judgement",
  "estimatedRole": "the role this resume best targets",
  "breakdown": [
    { "category": "Contact Info", "score": <0-100>, "feedback": "one short line" },
    { "category": "Clear Structure & Parsing", "score": <0-100>, "feedback": "one short line" },
    { "category": "Keywords & Skills Match", "score": <0-100>, "feedback": "one short line" },
    { "category": "Experience & Achievements", "score": <0-100>, "feedback": "one short line" },
    { "category": "Action Verbs & Quantification", "score": <0-100>, "feedback": "one short line" },
    { "category": "Education & Certifications", "score": <0-100>, "feedback": "one short line" },
    { "category": "Formatting & Length", "score": <0-100>, "feedback": "one short line" }
  ],
  "strengths": ["short strength", "short strength"],
  "weaknesses": ["short weakness", "short weakness"],
  "matchedKeywords": ["keyword", "keyword"],
  "missingKeywords": ["keyword", "keyword"],
  "suggestions": ["actionable fix", "actionable fix"]
}

Rules:
- If a job description is provided, matchedKeywords must be the relevant keywords actually present in the resume, and missingKeywords must be important keywords from the job description that are absent.
- If no job description, matchedKeywords = skills clearly present in the resume relevant to the estimated role; missingKeywords = important missing skills/attributes a good applicant for that role would have.
- Be strict and honest. Score harshly for unclear formatting, missing contact info, no quantified achievements, spelling issues, or content unrelated to the target role.`;
        
        const userPrompt = `--- RESUME CONTENT ---
${truncatedContext}
-------------------------

TARGET ROLE: ${targetRole}

JOB DESCRIPTION:
${jobDescription}`;

        const response = await chatModel.invoke([
            ["system", systemPrompt],
            ["user", userPrompt]
        ]);

        return parseAtsJson(response.content);
    } catch (error) {
        console.error("Error analyzing resume for ATS:", error);
        throw error;
    }
};

export default {
    parseResumePdf,
    splitResumeText,
    embedTextsWithMistral,
    embedQueryWithMistral,
    askResumeWithMistral,
    askResumeWithAnthropic,
    compareMistralAndAnthropic,
    analyzeResumeForAts
};