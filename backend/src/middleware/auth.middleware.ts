import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import type { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Read the token frome the request
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({error: "No token provided"})
  }

  // Check if the token is valid
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET n'est pas défini dans le fichier .env");
    }

    const decoded = jwt.verify(token, secret) as jwt.JwtPayload & { id: number };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      return res.status(401).json({error: "User no longer exists"})
    }

    req.user = user;
    
    next();
  } catch (err) {
    return res.status(401).json({error: "Invalid token"})
  }
}
