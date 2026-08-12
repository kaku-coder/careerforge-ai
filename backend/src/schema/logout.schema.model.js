import mongoose from "mongoose";


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
            expires: 7 * 24 * 60 * 60
        }
    },
    {
        timestamps: true
    }
);

const Logout = mongoose.model("Logout", logoutSchema);

export default Logout;
