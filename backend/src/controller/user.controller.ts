import { prisma } from "../config/db.js";
import type { Request, Response } from "express";

const getUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Non autorisé, ID manquant" });
    }

    const userId = Number(req.user.id);

    const userProfile = await prisma.user.findUnique({
      where: { 
        id: userId 
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        role: true,
        address: {
          select: {
            street: true,
            city: true,
            zipCode: true,
            country: true,
          }
        }
      }
    });

    if (!userProfile) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    return res.status(200).json({
      status: "success",
      data: {
        user: userProfile,
      },
    });

  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    return res.status(500).json({ message: "Erreur serveur interne" });
  }
};

export { getUserProfile };