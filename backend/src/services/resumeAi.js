import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings, ChatMistralAI } from "@langchain/mistralai";

/**
 * Service to parse text content from a PDF file path or Blob/Buffer
 * @param {string | Blob} fileInput - Path to PDF file or Blob
 * @returns {Promise<Array>} List of document pages with pageContent and metadata
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
 * @param {Array | string} input - List of Document objects or raw text string
 * @param {Object} options - chunkSize (default 500) and chunkOverlap (default 50)
 * @returns {Promise<Array>} List of split document chunks
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
 * Generate vector embeddings for an array of text strings using Mistral AI
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
 * Generate vector embedding for a single query string using Mistral AI
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
 * Ask a question about candidate's resume using Mistral AI
 * @param {string} question - Question asked by user
 * @param {string} resumeContext - Extracted resume text context
 * @returns {Promise<string>} AI answer response string
 */
export const askResumeWithMistral = async (question, resumeContext) => {
    try {
        const chatModel = getMistralChatModel();

        const systemPrompt = `You are CareerForge AI Resume Assistant. Your job is to answer questions about candidate resumes accurately based ONLY on the provided resume context below.
If the answer is not in the resume context, politely state that it's not mentioned in the resume.

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

export default {
    parseResumePdf,
    splitResumeText,
    embedTextsWithMistral,
    embedQueryWithMistral,
    askResumeWithMistral
};