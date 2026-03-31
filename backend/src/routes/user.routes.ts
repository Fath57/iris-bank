import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserProfile, changePassword, toggle2FA, setup2FA, confirm2FA, disable2FA } from "../controller/user.controller.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { changePasswordSchema, toggle2FASchema } from "../validators/user.validators.js";
import { z } from "zod";

const confirm2FASchema = z.object({
  code: z.string().length(6, "Le code TOTP doit faire 6 chiffres"),
});

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", getUserProfile);
router.put("/change-password", validateRequest(changePasswordSchema), changePassword);
router.post("/toggle-2fa", validateRequest(toggle2FASchema), toggle2FA); // legacy
router.post("/2fa/setup", setup2FA);
router.post("/2fa/confirm", validateRequest(confirm2FASchema), confirm2FA);
router.post("/2fa/disable", validateRequest(confirm2FASchema), disable2FA);

export default router;