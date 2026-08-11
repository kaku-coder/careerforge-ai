import express from "express"
import morgan from "morgan"
import cookieparser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"



const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieparser())

app.use("/api/auth", authRoutes)


app.get("/", (req, res) => {
    res.json({ message: "Welcome to CareerForge AI Backend" })
})


export default app