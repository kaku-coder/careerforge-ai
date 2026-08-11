import app from "./src/app.js";
import dotenv from "dotenv" 
import connectDatabase from "./src/config/connectDb.js";

dotenv.config()

const PORT = process.env.PORT || 5000
app.listen(PORT,async()=>{
    await connectDatabase()
    console.log(`server is running on port ${PORT}`)
})
