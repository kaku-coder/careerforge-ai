import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            enum: ["user", "ai"],
            required: true
        },
        text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { _id: true }
);

const roadmapSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        messages: [messageSchema]
    },
    {
        timestamps: true
    }
);

const RoadmapModel = mongoose.model("Roadmap", roadmapSchema);

export default RoadmapModel;
