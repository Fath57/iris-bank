import express from "express";
import { getBeneficiaries, addBeneficiary } from "../controller/beneficiary.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { addBeneficiarySchema } from "../validators/beneficiary.validator.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getBeneficiaries);

router.post("/add", validateRequest(addBeneficiarySchema), addBeneficiary);

export default router;