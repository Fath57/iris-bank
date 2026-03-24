import express from "express";
import { verify, execute, withdrawal, deposit } from "../controller/transaction.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { verifyTransactionSchema, executeTransactionSchema, depositSchema, withdrawalSchema } from "../validators/transaction.validators.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/verify", validateRequest(verifyTransactionSchema), verify);

router.post("/execute", validateRequest(executeTransactionSchema), execute);

router.post("/deposit", validateRequest(depositSchema), deposit);

router.post("/withdrawal", validateRequest(withdrawalSchema), withdrawal);

export default router;