import { body, cookie, validationResult } from "express-validator";

/**
 * Middleware to handle validation result and send formatted error response
 */
export const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: errors.array().map((err) => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

/**
 * Express validator rules for User Registration
 */
export const registerValidator = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    validateResult
];

/**
 * Express validator rules for User Login
 */
export const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),

    validateResult
];

/**
 * Express validator rules for User Logout
 */
export const logoutValidator = [
    cookie("token")
        .notEmpty()
        .withMessage("Invalid auth token cookie"),

    validateResult
];
