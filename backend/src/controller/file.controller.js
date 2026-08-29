import { uploadToImageKit } from "../config/imagekit.js";
import FileModel from "../schema/resume_schema/file.schema.model.js";

/**
 * Controller to upload a file to ImageKit and save its details in MongoDB
 */
export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded. Please select a file to upload."
            });
        }

        // 1. Upload file buffer to ImageKit
        const imagekitResponse = await uploadToImageKit(
            req.file.buffer,
            req.file.originalname,
            "/uploads"
        );

        // 2. Save metadata into MongoDB using FileModel
        const newFile = await FileModel.create({
            user: req.user?._id || req.user?.id, // Requires auth middleware
            fileId: imagekitResponse.fileId,
            url: imagekitResponse.url,
            thumbnailUrl: imagekitResponse.thumbnailUrl || imagekitResponse.url,
            name: req.file.originalname,
            fileType: req.file.mimetype,
            size: req.file.size
        });

        return res.status(201).json({
            success: true,
            message: "File uploaded and saved successfully",
            data: newFile
        });
    } catch (error) {
        console.error("Upload File Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to upload file",
            error: error.message
        });
    }
};

/**
 * Get all files uploaded by the authenticated user
 */
export const getUserFiles = async (req, res) => {
    try {
        const files = await FileModel.find({ user: req.user?._id || req.user?.id }).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            count: files.length,
            data: files
        });
    } catch (error) {
        console.error("Get User Files Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch files",
            error: error.message
        });
    }
};
