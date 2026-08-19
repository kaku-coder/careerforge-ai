import { Router } from "express";
import passport from "passport";

// this is all routes 
import {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    googleCallbackHandler,
    googleTokenLogin
} from "../controller/auth.controller.js";
// this is all validator file from the auth controller
import {
    registerValidator,
    loginValidator,
    logoutValidator
} from "../validator/auth.validator.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.post("/logout", logoutValidator, logoutUser);
router.get("/profile", authenticateUser, getProfile);

// Google Auth Services Routes
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    googleCallbackHandler
);

router.post("/google-login", googleTokenLogin);

export default router;  