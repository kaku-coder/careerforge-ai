import "./env.js";
import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error("MONGODB_URL is undefined. Please ensure MONGODB_URL is set in backend/.env");
        }

        const conn = await mongoose.connect(mongoUrl);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDatabase;
