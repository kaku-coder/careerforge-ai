import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env relative to server.js regardless of current working directory
dotenv.config({ path: path.join(__dirname, ".env") });

import app from "./src/app.js";
import connectDatabase from "./src/config/connectDb.js";
import "./src/config/redis.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDatabase();
    console.log(`Server is running on port ${PORT}`);
});
