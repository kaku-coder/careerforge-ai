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

export default {
    parseResumePdf,
    splitResumeText,
    embedTextsWithMistral,
    embedQueryWithMistral,
    askResumeWithMistral,
    askResumeWithAnthropic,
    compareMistralAndAnthropic
};