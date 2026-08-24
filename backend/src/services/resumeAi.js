import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

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

export default parseResumePdf;