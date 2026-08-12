import jwt from "jsonwebtoken";
import User from "../schema/login.schema.model.js";
import Logout from "../schema/logout.schema.model.js";
import redis from "../config/redis.js";

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. No token provided."
            });
        }

        // 1. Check Redis cache first for high-performance blacklist check
        const isBlacklistedInRedis = await redis.get(`blacklist:${token}`).catch(() => null);
        if (isBlacklistedInRedis) {
            return res.status(401).json({
                success: false,
                message: "Token has been revoked/logged out. Please log in again."
            });
        }

        // 2. Fallback check in MongoDB
        const isBlacklistedInDb = await Logout.findOne({ token });
        if (isBlacklistedInDb) {
            return res.status(401).json({
                success: false,
                message: "Token has been revoked/logged out. Please log in again."
            });
        }

        const secretKey = process.env.JWT_SECRET || process.env.JWT_SECREAT_KEY || "default_jwt_secret";
        const decoded = jwt.verify(token, secretKey);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found or invalid token."
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token."
        });
    }
};
