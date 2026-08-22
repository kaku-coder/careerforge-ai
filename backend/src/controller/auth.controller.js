import User from "../schema/login.schema.model.js";
import Logout from "../schema/logout.schema.model.js";
import redis from "../config/redis.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Helper to get JWT secret key
const getSecretKey = () => process.env.JWT_SECRET || process.env.JWT_SECREAT_KEY || "default_jwt_secret";

// Helper cookie options
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

/**
 * Register User & set Auth Cookie
 */
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: userData._id, email: userData.email },
            getSecretKey(),
            { expiresIn: "7d" }
        );

        // Set JWT in HTTP-only Cookie
        res.cookie("token", token, cookieOptions);

        const userResponse = userData.toObject();
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: userResponse
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

/**
 * Login User & set Auth Cookie
 */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Fetch user including hidden password field
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            getSecretKey(),
            { expiresIn: "7d" }
        );

        // Set JWT in HTTP-only Cookie
        res.cookie("token", token, cookieOptions);

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: userResponse
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

/**
 * Logout User & Clear Auth Cookie
 */
export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (token) {
            // Store token in Redis blacklist with 7 days TTL (604800s)
            await redis.set(`blacklist:${token}`, "true", "EX", 7 * 24 * 60 * 60).catch(() => {});
            // Also store in MongoDB as fallback
            await Logout.create({ token }).catch(() => {});
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

/**
 * Get User Profile from Auth Token Cookie
 */
export const getProfile = async (req, res) => {
    try {
        // If authenticateUser middleware set req.user
        if (req.user) {
            return res.status(200).json({
                success: true,
                user: req.user
            });
        }

        // Fallback: extract token directly if middleware not attached
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. No token cookie found."
            });
        }

        const decoded = jwt.verify(token, getSecretKey());
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token cookie"
        });
    }
};

/**
 * Handle Google OAuth Callback (Passport) & Issue Auth Cookie
 */
export const googleCallbackHandler = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Google authentication failed"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: req.user._id, email: req.user.email },
            getSecretKey(),
            { expiresIn: "7d" }
        );

        // Set JWT in HTTP-only Cookie
        res.cookie("token", token, cookieOptions);

        // If client redirect URL is provided or frontend environment set
        const clientRedirectUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        return res.redirect(`${clientRedirectUrl}/overview`);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Google auth error"
        });
    }
};

/**
 * Handle direct Google User Profile / Credential Login from Frontend
 */
export const googleTokenLogin = async (req, res) => {
    try {
        const { email, username, googleId, avatar } = req.body;

        if (!email || !googleId) {
            return res.status(400).json({
                success: false,
                message: "Email and Google ID are required"
            });
        }

        let user = await User.findOne({
            $or: [{ googleId }, { email }]
        });

        if (!user) {
            user = await User.create({
                username: username || email.split("@")[0],
                email,
                googleId,
                avatar: avatar || ""
            });
        } else if (!user.googleId) {
            user.googleId = googleId;
            if (avatar && !user.avatar) user.avatar = avatar;
            await user.save();
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            getSecretKey(),
            { expiresIn: "7d" }
        );

        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Google sign-in successful",
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Google sign-in failed"
        });
    }
};