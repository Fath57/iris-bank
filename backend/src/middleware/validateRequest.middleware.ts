import { z } from "zod";
import type { NextFunction, Request, Response } from "express";

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      const errorMessages = result.error.issues.map((issue: z.core.$ZodIssue) => issue.message);
      const error = errorMessages.join(", ");

      return res.status(400).json({ message: error });
    }

    next();
  };
};