import { Router } from "express";
import * as authController from "../controllers/authController.js";
import validate from "../middlewares/validationMiddleware.js";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "../validations/authValidation.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/verify-email", authController.verifyEmail);
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword)
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword)

export default router;
