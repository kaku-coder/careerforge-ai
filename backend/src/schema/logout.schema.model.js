import mongoose from "mongoose";

/**
 * Schema to store blacklisted/invalidated JWT tokens upon user logout.
 * Uses MongoDB TTL (Time-To-Live) index to automatically delete records after 7 days.
 */
const logoutSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required"],
            unique: true,
            index: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 7 * 24 * 60 * 60 // Automatically delete document after 7 days
        }
    },
    {
        timestamps: true
    }
);

const Logout = mongoose.model("Logout", logoutSchema);

export default Logout;
