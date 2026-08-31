import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieparser from "cookie-parser"
import passport from "passport"
import authRoutes from "./routes/auth.routes.js"
import fileRoutes from "./routes/file.routes.js"
import resumeRoutes from "./routes/resume.routes.js"
import careerRoadmapRoutes from "./routes/careerRoadmap.routes.js"
import helmet from "helmet"
import configureGoogleStrategy from "./config/google.config.js"

const app = express()

// Initialize Google OAuth Passport strategy
configureGoogleStrategy();

// CORS configuration for frontend credentials
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    credentials: true
}))

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieparser())
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(passport.initialize())

app.use("/api/auth", authRoutes)
app.use("/api/files", fileRoutes)
app.use("/api/resume", resumeRoutes)
app.use("/api/career-roadmap", careerRoadmapRoutes)

app.get("/", (req, res) => {
    res.json({ message: "Welcome to CareerForge AI Backend" })
})

export default app