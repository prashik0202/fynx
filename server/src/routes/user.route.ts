import { Router } from "express";
import { ProfileController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const profileController = new ProfileController();
const router = Router();

router.get("/profile", authMiddleware, profileController.getProfileController);

export default router;
