import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true },
        level: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "intermediate"
        }
    },
    { _id: false }
);

const projectSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true },
        description: { type: String, default: "" },
        technologies: [{ type: String }]
    },
    { _id: false }
);

const roadmapItemSchema = new mongoose.Schema(
    {
        title: { type: String, trim: true },
        description: { type: String, default: "" },
        status: {
            type: String,
            enum: ["completed", "current", "next", "upcoming", "goal"],
            default: "upcoming"
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },
        estimatedDays: { type: Number, default: 3 },
        skills: [{ type: String }],
        prerequisites: [{ type: String }],
        whyNext: { type: String, default: "" },
        interviewImportance: { type: String, default: "Medium" },
        projectSuggestion: { type: String, default: "" },
        order: { type: Number, default: 0 }
    },
    { _id: true }
);

const conversationMessageSchema = new mongoose.Schema(
    {
        role: { type: String, enum: ["user", "assistant"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    },
    { _id: true }
);

const careerRoadmapSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        targetRole: { type: String, default: "" },
        currentLevel: { type: String, default: "" },
        experience: { type: String, default: "" },
        goal: { type: String, default: "" },
        dailyLearningTime: { type: Number, default: 0 },
        deadline: { type: String, default: "" },
        currentSkills: [skillSchema],
        projects: [projectSchema],
        weakAreas: [{ type: String }],
        roadmap: [roadmapItemSchema],
        progress: { type: Number, default: 0 },
        currentStep: { type: String, default: "" },
        conversation: [conversationMessageSchema]
    },
    {
        timestamps: true
    }
);

const CareerRoadmapModel = mongoose.model("CareerRoadmap", careerRoadmapSchema);

export default CareerRoadmapModel;
