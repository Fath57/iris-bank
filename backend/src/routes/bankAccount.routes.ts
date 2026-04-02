import express from "express";
import { closeAccount, create, getAccountById, getStats, getUserAccounts } from "../controller/bankAccount.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { createBankAccountSchema } from "../validators/bankAccount.validators.js";

const router = express.Router();

router.use(authMiddleware)

router.post("/create", validateRequest(createBankAccountSchema), create);

router.get("/getByUser", getUserAccounts);

router.get("/stats", getStats);

router.get("/:id", getAccountById);

router.patch("/:id/close", closeAccount);

export default router;