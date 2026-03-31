import express from "express";
import { getMe, login, logout, register, verifyEmail, resendVerificationCode } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/verify-email", verifyEmail);

router.post("/resend-code", resendVerificationCode);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", authMiddleware, getMe);

export default router;