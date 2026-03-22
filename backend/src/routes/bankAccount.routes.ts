import express from "express";
import { create, getUserAccounts } from "../controller/bankAccount.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validateRequest.middleware.js";
import { createBankAccountSchema } from "../validators/bankAccount.validators.js";

const router = express.Router();

router.use(authMiddleware)

router.post("/create", validateRequest(createBankAccountSchema), create);

router.get("/getByUser", getUserAccounts);

// router.delete("/:id", delete);

export default router;