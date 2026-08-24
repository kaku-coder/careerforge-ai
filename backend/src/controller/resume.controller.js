import { parseResumePdf } from "../services/resumeAi.js";
import ResumeModel from "../schema/resume.schema.model.js";

/**
 * Controller to upload, parse PDF resume, and save the extracted data in MongoDB
 */
export const processResumePdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No PDF file uploaded. Please upload a resume PDF."
            });
        }

        // Convert uploaded file buffer into a Blob for PDFLoader
        const pdfBlob = new Blob([req.file.buffer], { type: "application/pdf" });
        
        // Parse PDF using LangChain PDFLoader service
        const docs = await parseResumePdf(pdfBlob);

        // Combine extracted text across pages
        const fullText = docs.map(doc => doc.pageContent).join("\n\n");

        // Format pages for MongoDB schema
        const formattedPages = docs.map(doc => ({
            pageContent: doc.pageContent,
            metadata: doc.metadata || {}
        }));

        // Save resume data inside MongoDB Resume collection
        const newResume = await ResumeModel.create({
            user: req.user?._id || req.user?.id || null,
            fileName: req.file.originalname,
            fileSize: req.file.size,
            extractedText: fullText,
            totalPages: docs.length,
            pages: formattedPages
        });

        return res.status(201).json({
            success: true,
            message: "Resume PDF parsed and saved to database successfully",
            data: newResume
        });
    } catch (error) {
        console.error("Process Resume Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to parse and save resume PDF",
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
