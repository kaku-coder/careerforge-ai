import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        fileId: {
            type: String,
            required: [true, "ImageKit File ID is required"]
        },
        url: {
            type: String,
            required: [true, "File URL is required"]
        },
        thumbnailUrl: {
            type: String
        },
        name: {
            type: String,
            required: [true, "File name is required"]
        },
        fileType: {
            type: String
        },
        size: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const FileModel = mongoose.model("File", fileSchema);

export default FileModel;
