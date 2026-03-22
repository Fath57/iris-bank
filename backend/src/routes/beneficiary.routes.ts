import express from "express";
import { getBeneficiaries, addBeneficiary } from "../controller/beneficiary.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getBeneficiaries);

router.post("/add", addBeneficiary);

export default router;