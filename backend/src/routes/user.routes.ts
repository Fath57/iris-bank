import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserProfile, changePassword, toggle2FA } from "../controller/user.controller.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { changePasswordSchema, toggle2FASchema } from "../validators/user.validators.js";

const router = express.Router();

router.use(authMiddleware)

router.get("/profile", getUserProfile);
router.put("/change-password", validateRequest(changePasswordSchema), changePassword);
router.post("/toggle-2fa", validateRequest(toggle2FASchema), toggle2FA);

export default router;