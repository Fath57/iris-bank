import express from "express";
import { verify, execute } from "../controller/transaction.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { verifyTransactionSchema, executeTransactionSchema } from "../validators/transaction.validators.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/verify", validateRequest(verifyTransactionSchema), verify);

router.post("/execute", validateRequest(executeTransactionSchema), execute);

export default router;