import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserProfile } from "../controller/user.controller.js";

const router = express.Router();

router.use(authMiddleware)

router.get("/profile", getUserProfile);

export default router;