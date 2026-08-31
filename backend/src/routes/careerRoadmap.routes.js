import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
    getCareerRoadmap,
    createCareerRoadmap,
    chatCareerRoadmap,
    updateRoadmapItem,
    regenerateCareerRoadmap
} from "../controller/career_roadmap_controller/careerRoadmap.controller.js";
import {
    chatValidator,
    updateItemValidator
} from "../validator/careerRoadmap.validator.js";

const router = Router();

// All career-roadmap routes are protected (authenticated user required)
router.use(authenticateUser);

router.post("/", createCareerRoadmap);
router.get("/", getCareerRoadmap);
router.post("/chat", chatValidator, chatCareerRoadmap);
router.post("/regenerate", regenerateCareerRoadmap);
router.patch("/:itemId", updateItemValidator, updateRoadmapItem);

export default router;
