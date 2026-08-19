import express from "express"
import morgan from "morgan"
import cookieparser from "cookie-parser"
import passport from "passport"
import authRoutes from "./routes/auth.routes.js"
import fileRoutes from "./routes/file.routes.js"
import helmet from "helmet"
import configureGoogleStrategy from "./config/google.config.js"

const app = express()

// Initialize Google OAuth Passport strategy
configureGoogleStrategy();

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieparser())
app.use(helmet())
app.use(passport.initialize())

app.use("/api/auth", authRoutes)
app.use("/api/files", fileRoutes)


app.get("/", (req, res) => {
    res.json({ message: "Welcome to CareerForge AI Backend" })
})


export default app