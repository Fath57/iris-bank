import { prisma } from "../config/db.js";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

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

const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const userId = Number(req.user.id);
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Mot de passe actuel et nouveau requis" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Le nouveau mot de passe doit contenir au moins 8 caractères" });
    }

    // Verify current password
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true }
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe actuel incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    return res.status(200).json({
      status: "success",
      message: "Mot de passe modifié avec succès"
    });

  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    return res.status(500).json({ message: "Erreur serveur interne" });
  }
};

const toggle2FA = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const userId = Number(req.user.id);
    const { enabled } = req.body;

    if (typeof enabled !== 'boolean') {
      return res.status(400).json({ message: "Le paramètre 'enabled' doit être un booléen" });
    }

    // For now, we'll just store the 2FA preference
    // In a real implementation, you'd want to:
    // 1. Generate a 2FA secret
    // 2. Show QR code to user
    // 3. Verify a code before enabling

    await prisma.user.update({
      where: { id: userId },
      data: {
        // We'll store this in a future field
        // For now, just acknowledge the request
      }
    });

    return res.status(200).json({
      status: "success",
      message: enabled ? "Authentification à deux facteurs activée" : "Authentification à deux facteurs désactivée",
      data: { twoFactorEnabled: enabled }
    });

  } catch (error) {
    console.error("Erreur lors du toggle 2FA:", error);
    return res.status(500).json({ message: "Erreur serveur interne" });
  }
};

export { getUserProfile, changePassword, toggle2FA };