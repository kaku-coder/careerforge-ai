import { Router } from "express";

// this is all routes 
import {
    registerUser,
    loginUser,
    logoutUser,
    getProfile
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

export default router;  