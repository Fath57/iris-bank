import { generateSecret, generateURI, verify as verifyTOTP } from "otplib";
import { prisma } from "../config/db.js";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";

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
        twoFactorEnabled: true,
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
  // Kept for backward compat — redirects to new endpoints
  return res.status(410).json({ message: "Utilisez POST /users/2fa/setup pour activer le 2FA TOTP" });
};

// Génère un secret TOTP et retourne l'URL otpauth + QR code (base64)
const setup2FA = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const userId = Number(req.user.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, twoFactorEnabled: true },
    });

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    if (user.twoFactorEnabled) {
      return res.status(400).json({ message: "Le 2FA est déjà activé" });
    }

    const secret = generateSecret();
    const otpauthUrl = generateURI({ secret, label: user.email, issuer: "IRIS Bank" });
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);

    // Stocker le secret temporairement (sera confirmé via /2fa/confirm)
    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret },
    });

    return res.status(200).json({
      status: "success",
      data: { qrCode: qrCodeDataUrl, secret },
    });
  } catch (error) {
    console.error("Erreur setup 2FA:", error);
    return res.status(500).json({ message: "Erreur serveur interne" });
  }
};

// Valide le premier code TOTP et active définitivement le 2FA
const confirm2FA = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const userId = Number(req.user.id);
    const { code } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { twoFactorSecret: true, twoFactorEnabled: true },
    });

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    if (user.twoFactorEnabled) {
      return res.status(400).json({ message: "Le 2FA est déjà activé" });
    }
    if (!user.twoFactorSecret) {
      return res.status(400).json({ message: "Lancez d'abord POST /users/2fa/setup" });
    }

    const isValid = await verifyTOTP({ token: code, secret: user.twoFactorSecret });
    if (!isValid) {
      return res.status(400).json({ message: "Code invalide, vérifiez votre application" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: true },
    });

    return res.status(200).json({
      status: "success",
      message: "Authentification à deux facteurs activée avec succès",
    });
  } catch (error) {
    console.error("Erreur confirm 2FA:", error);
    return res.status(500).json({ message: "Erreur serveur interne" });
  }
};

// Désactive le 2FA après vérification d'un code valide
const disable2FA = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const userId = Number(req.user.id);
    const { code } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { twoFactorSecret: true, twoFactorEnabled: true },
    });

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    if (!user.twoFactorEnabled) {
      return res.status(400).json({ message: "Le 2FA n'est pas activé" });
    }
    if (!user.twoFactorSecret) {
      return res.status(400).json({ message: "Aucun secret 2FA trouvé" });
    }

    const isValid = await verifyTOTP({ token: code, secret: user.twoFactorSecret });
    if (!isValid) {
      return res.status(400).json({ message: "Code invalide" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: false, twoFactorSecret: null },
    });

    return res.status(200).json({
      status: "success",
      message: "Authentification à deux facteurs désactivée",
    });
  } catch (error) {
    console.error("Erreur disable 2FA:", error);
    return res.status(500).json({ message: "Erreur serveur interne" });
  }
};

export { getUserProfile, changePassword, toggle2FA, setup2FA, confirm2FA, disable2FA };