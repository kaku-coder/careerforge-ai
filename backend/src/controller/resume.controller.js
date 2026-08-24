import { parseResumePdf, splitResumeText, embedTextsWithMistral, askResumeWithMistral } from "../services/resumeAi.js";
import ResumeModel from "../schema/resume.schema.model.js";

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

        // 1. Convert uploaded file buffer into a Blob for PDFLoader
        const pdfBlob = new Blob([req.file.buffer], { type: "application/pdf" });
        
        // 2. Parse PDF pages using LangChain PDFLoader service
        const docs = await parseResumePdf(pdfBlob);

        // 3. Combine extracted text across pages
        const fullText = docs.map(doc => doc.pageContent).join("\n\n");

        // 4. Split PDF documents into smaller chunks (chunkSize: 500 characters, overlap: 50)
        const splitDocs = await splitResumeText(docs, { chunkSize: 500, chunkOverlap: 50 });

        // 5. Generate Mistral AI Embeddings for all text chunks if MISTRAL_API_KEY is configured
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

        // 6. Format pages & chunks (including embedding vectors) for MongoDB schema
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

        // 7. Save resume data, text chunks, and vector embeddings in MongoDB
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
 * Controller to ask a question about a candidate's resume using Mistral AI
 */
export const askResumeQuestionController = async (req, res) => {
    try {
        const { question, resumeId, resumeText } = req.body;

        if (!question || question.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Please provide a question to ask."
            });
        }

        let contextText = resumeText || "";

        // If resumeId is passed, fetch resume from MongoDB database
        if (!contextText && resumeId) {
            const foundResume = await ResumeModel.findById(resumeId);
            if (foundResume) {
                contextText = foundResume.extractedText;
            }
        }

        // If no resumeId or text provided, fetch latest uploaded resume
        if (!contextText) {
            const latestResume = await ResumeModel.findOne().sort({ createdAt: -1 });
            if (latestResume) {
                contextText = latestResume.extractedText;
            }
        }

        if (!contextText) {
            return res.status(404).json({
                success: false,
                message: "No resume found to answer questions from. Please upload a resume first."
            });
        }

        // Call Mistral AI to answer question based on resume context
        const answer = await askResumeWithMistral(question, contextText);

        return res.status(200).json({
            success: true,
            question,
            answer
        });
    } catch (error) {
        console.error("Ask Resume Question Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get AI answer for resume",
            error: error.message
        });
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
        console.error("Get User Resumes Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch resumes",
            error: error.message
        });
    }
};
