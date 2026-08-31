import { body, param, validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array()
        });
    }
    return next();
};

export const chatValidator = [
    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message cannot be empty.")
        .isLength({ max: 2000 })
        .withMessage("Message too long."),
    validateResult
];

export const updateItemValidator = [
    param("itemId").isMongoId().withMessage("Invalid item id."),
    body("status")
        .optional()
        .isIn(["completed", "current", "next", "upcoming", "goal"])
        .withMessage("Invalid status value."),
    validateResult
];
