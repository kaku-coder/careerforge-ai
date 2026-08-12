import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always load backend/.env reliably before any other module imports
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
