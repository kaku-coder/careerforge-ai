import {
    parseResumePdf,
    splitResumeText,
    embedTextsWithMistral,
    askResumeWithMistral,
    askResumeWithAnthropic,
    compareMistralAndAnthropic,
    analyzeResumeForAts
} from "../../services/resume_services/resumeAi.js";
import ResumeModel from "../../schema/resume_schema/resume.schema.model.js";

/**
 * Controller to upload, parse PDF resume, split text into chunks, generate Mistral embeddings, and save in MongoDB
 */
export const processResumePdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No PDF file uploaded. Please upload a resume PDF."
            });
        }

        const pdfBlob = new Blob([req.file.buffer], { type: "application/pdf" });
        const docs = await parseResumePdf(pdfBlob);
        const fullText = docs.map(doc => doc.pageContent).join("\n\n");
        const splitDocs = await splitResumeText(docs, { chunkSize: 500, chunkOverlap: 50 });

        let chunkEmbeddings = [];
        const hasMistralKey = Boolean(process.env.MISTRAL_API_KEY);
        if (hasMistralKey && splitDocs.length > 0) {
            try {
                const chunkTexts = splitDocs.map(doc => doc.pageContent);
                chunkEmbeddings = await embedTextsWithMistral(chunkTexts);
            } catch (embedError) {
                console.warn("Mistral Embedding Warning:", embedError.message);
            }
        }

        const formattedPages = docs.map(doc => ({
            pageContent: doc.pageContent,
            metadata: doc.metadata || {}
        }));

        const formattedChunks = splitDocs.map((chunk, index) => ({
            chunkIndex: index + 1,
            chunkText: chunk.pageContent,
            embedding: chunkEmbeddings[index] || [],
            metadata: chunk.metadata || {}
        }));

        const newResume = await ResumeModel.create({
            user: req.user?._id || req.user?.id || null,
            fileName: req.file.originalname,
            fileSize: req.file.size,
            extractedText: fullText,
            totalPages: docs.length,
            pages: formattedPages,
            chunks: formattedChunks
        });

        return res.status(201).json({
            success: true,
            message: "Resume PDF parsed, chunked, and processed successfully",
            totalChunks: formattedChunks.length,
            embeddingsGenerated: Boolean(chunkEmbeddings.length > 0),
            data: newResume
        });
    } catch (error) {
        console.error("Process Resume Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to parse and process resume PDF",
            error: error.message
        });
    }
};

/**
 * Helper to get resume context text from request or database
 */
const getResumeContext = async (req) => {
    const { resumeId, resumeText } = req.body;
    if (resumeText) return resumeText;

    if (resumeId) {
        const found = await ResumeModel.findById(resumeId);
        if (found) return found.extractedText;
    }

    const latest = await ResumeModel.findOne().sort({ createdAt: -1 });
    return latest ? latest.extractedText : null;
};

/**
 * Dedicated Controller for Mistral AI Q&A
 */
export const askMistralController = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question || question.trim() === "") {
            return res.status(400).json({ success: false, message: "Please provide a question." });
        }

        const contextText = await getResumeContext(req);
        if (!contextText) {
            return res.status(404).json({ success: false, message: "No resume found. Please upload a resume first." });
        }

        const answer = await askResumeWithMistral(question, contextText);
        return res.status(200).json({
            success: true,
            provider: "Mistral AI",
            model: "mistral-small-latest",
            question,
            answer
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Mistral AI Error", error: error.message });
    }
};

/**
 * Dedicated Controller for Anthropic Claude Q&A
 */
export const askAnthropicController = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question || question.trim() === "") {
            return res.status(400).json({ success: false, message: "Please provide a question." });
        }

        const contextText = await getResumeContext(req);
        if (!contextText) {
            return res.status(404).json({ success: false, message: "No resume found. Please upload a resume first." });
        }

        const answer = await askResumeWithAnthropic(question, contextText);
        return res.status(200).json({
            success: true,
            provider: "Anthropic Claude",
            model: "claude-3-5-sonnet",
            question,
            answer
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Anthropic Claude Error", error: error.message });
    }
};

/**
 * Dedicated Controller for Comparing Both AI Models Side-by-Side
 */
export const compareModelsController = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question || question.trim() === "") {
            return res.status(400).json({ success: false, message: "Please provide a question." });
        }

        const contextText = await getResumeContext(req);
        if (!contextText) {
            return res.status(404).json({ success: false, message: "No resume found. Please upload a resume first." });
        }

        const comparison = await compareMistralAndAnthropic(question, contextText);
        return res.status(200).json({
            success: true,
            mode: "comparison",
            question,
            comparison
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Model Comparison Error", error: error.message });
    }
};

/**
 * Universal Controller for Q&A (Supports provider parameter)
 */
export const askResumeQuestionController = async (req, res) => {
    const { provider = "mistral" } = req.body;
    const mode = provider.toLowerCase();

    if (mode === "both" || mode === "compare") {
        return compareModelsController(req, res);
    } else if (mode === "anthropic" || mode === "claude") {
        return askAnthropicController(req, res);
    } else {
        return askMistralController(req, res);
    }
};

/**
 * Controller to fetch all saved resumes for the authenticated user
 */
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        const query = userId ? { user: userId } : {};
        const resumes = await ResumeModel.find(query).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: resumes.length,
            data: resumes
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch resumes", error: error.message });
    }
};

/**
 * Controller to run an AI-powered ATS compatibility analysis on a resume
 */
export const atsAnalyzeController = async (req, res) => {
    try {
        const { resumeId, targetRole = "", jobDescription = "", provider = "mistral" } = req.body;

        const contextText = await getResumeContext(req);
        if (!contextText) {
            return res.status(404).json({ success: false, message: "No resume found. Please upload a resume first." });
        }

        const analysis = await analyzeResumeForAts(contextText, {
            targetRole,
            jobDescription,
            provider
        });

        return res.status(200).json({
            success: true,
            provider: provider === "both" || provider === "compare" ? "comparison" : provider,
            resumeId: resumeId || null,
            analysis
        });
    } catch (error) {
        console.error("ATS Analysis Controller Error:", error);
        return res.status(500).json({ success: false, message: "ATS analysis failed", error: error.message });
    }
};
