import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserProfile, changePassword, toggle2FA } from "../controller/user.controller.js";

const router = express.Router();

router.use(authMiddleware)

router.get("/profile", getUserProfile);
router.put("/change-password", changePassword);
router.post("/toggle-2fa", toggle2FA);

export default router;