import express from "express"
import morgan from "morgan"
import cookieparser from "cookie-parser"


const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieparser())


export default app