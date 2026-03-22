import type { Response } from 'express';
import jwt from 'jsonwebtoken'

export const generateToken = (userId: number, res: Response) => {
  const payload = { id: userId };
  
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Erreur critique : La variable d'environnement JWT_SECRET est manquante.");
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  const token = jwt.sign(payload, secret, {
    expiresIn: expiresIn as `${number}${'s'|'m'|'h'|'d'|'w'|'y'}`,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  
  return token;
};