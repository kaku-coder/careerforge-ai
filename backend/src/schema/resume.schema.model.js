import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        fileName: {
            type: String,
            required: [true, "Resume file name is required"]
        },
        fileSize: {
            type: Number
        },
        fileUrl: {
            type: String
        },
        extractedText: {
            type: String,
            required: [true, "Extracted text content is required"]
        },
        totalPages: {
            type: Number,
            default: 1
        },
        pages: [
            {
                pageContent: String,
                metadata: mongoose.Schema.Types.Mixed
            }
        ],
        chunks: [
            {
                chunkIndex: Number,
                chunkText: String,
                embedding: [Number], // Mistral AI embedding vector array
                metadata: mongoose.Schema.Types.Mixed
            }
        ],
        parsedSkills: [
            {
                type: String
            }
        ],
        summary: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const ResumeModel = mongoose.model("Resume", resumeSchema);

export default ResumeModel;
