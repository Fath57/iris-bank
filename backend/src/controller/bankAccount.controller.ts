import { prisma } from "../config/db.js";
import type { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
	const body = req.body;
	const { type } = body;

  if (!req.user || !req.user.id || !type) {
    return res.status(400).json({ message: "UserId et Type sont requis" });
  }

  const randomDigits = Array.from({ length: 23 }, () => Math.floor(Math.random() * 10)).join('');
  const iban = `FR76${randomDigits}`;

  const bankAccount = await prisma.bankAccount.create({
    data: {
      userId: Number(req.user.id),
      type: type,
      iban: iban, 
      balance: 100,           
      status: "ACTIVE",
      transactions: {
        create: {
          type: "DEPOSIT",
          amount: 100,
          description: "Offre de bienvenue IrisBank",
        }
      }
    },
  });

  // Success
	res.status(201).json({
		status: "success",
		data: {
      bankAccount,
    },
	});
};


const getUserAccounts = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    const userId = Number(req.user.id);

    const accounts = await prisma.bankAccount.findMany({
      where: { 
        userId: userId 
      },
      include: {
        transactions: {
          orderBy: { 
            date: 'desc'
          },
          take: 3,
        },
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Calcul du solde cumulé de tous les comptes
    const totalBalance = accounts.reduce((sum, account) => {
      return sum + Number(account.balance);
    }, 0);

    // Succès
    return res.status(200).json({
      status: "success",
      data: {
        totalBalance,
        accounts,
      },
    });

  } catch (error) {
    console.error("Erreur lors de la récupération des comptes:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

export { create, getUserAccounts };