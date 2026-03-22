import { prisma } from "../config/db.js";
import type { Request, Response } from "express";

const getBeneficiaries = async (req: Request, res: Response) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  const userId = Number(req.user.id);

  try {
    const beneficiaries = await prisma.beneficiary.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return res.status(200).json({
      status: "success",
      data: {
        beneficiaries,
      },
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des bénéficiaires:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};


const addBeneficiary = async (req: Request, res: Response) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  const { name, iban } = req.body;
  const userId = Number(req.user.id);

  try {
    // Vérifie qu'il n'a pas déjà ce bénéficiaire (même IBAN pour le même owner)
    const existing = await prisma.beneficiary.findFirst({
      where: {
        ownerId: userId,
        iban,
      },
    });

    if (existing) {
      return res.status(409).json({ message: "Ce bénéficiaire existe déjà" });
    }

    const beneficiary = await prisma.beneficiary.create({
      data: {
        name,
        iban,
        ownerId: userId,
      },
    });

    return res.status(201).json({
      status: "success",
      data: {
        beneficiary,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du bénéficiaire:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};


export { getBeneficiaries, addBeneficiary };