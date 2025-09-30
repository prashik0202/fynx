import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { SignInSchema, SignUpSchema, verifyEmailSchema } from "../schema/auth.schema";

const authController = new AuthController();
const router = Router();

router.post("/signup", validate(SignUpSchema) ,authController.signupController);
router.post("/signin", validate(SignInSchema) ,authController.signInController);
router.post("/verify", validate(verifyEmailSchema), authController.verifyOtpController);
router.get("/refresh-token", authController.refreshTokenController);
router.post("/logout", authController.logoutController);

export default router;
