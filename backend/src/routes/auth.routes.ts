import express from "express";
import { getMe, login, logout, register, verifyEmail, resendVerificationCode, verify2FA } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { z } from "zod";

const verify2FASchema = z.object({
  userId: z.coerce.number({ required_error: "userId requis" }),
  code: z.string().length(6, "Le code TOTP doit faire 6 chiffres"),
});

const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-code", resendVerificationCode);
router.post("/login", login);
router.post("/2fa/verify", validateRequest(verify2FASchema), verify2FA);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

export default router;