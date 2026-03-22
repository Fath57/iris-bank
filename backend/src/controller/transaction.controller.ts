import { prisma } from "../config/db.js";
import type { Request, Response } from "express";

const verify = async (req: Request, res: Response) => {
  const { fromAccountIban } = req.body;
  
  if (!req.user || !req.user.id) return res.status(401).json({ message: "Non autorisé" });
  const userId = Number(req.user.id);

  try {
    const sourceAccount = await prisma.bankAccount.findUnique({
      where: { iban: fromAccountIban }
    });

    if (!sourceAccount || sourceAccount.userId !== userId) {
      return res.status(403).json({ message: "Compte source non autorisé ou introuvable" });
    }

    return res.status(200).json({ 
      status: "success", 
      message: "Transaction vérifiée avec succès, prête pour confirmation" 
    });
  } catch (error) {
    console.error("Erreur lors de la vérification:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const execute = async (req: Request, res: Response) => {
  const { fromAccountIban, toBeneficiaryIban, amount, toBeneficiaryName, motif } = req.body;
  
  if (!req.user || !req.user.id) return res.status(401).json({ message: "Non autorisé" });
  const userId = Number(req.user.id);

  try {
    const result = await prisma.$transaction(async (tx) => {
      
      const sourceAccount = await tx.bankAccount.findUnique({
        where: { iban: fromAccountIban },
        include: { user: true }
      });

      if (!sourceAccount || sourceAccount.userId !== userId) {
        throw new Error("Compte source invalide");
      }

      let beneficiary = await tx.beneficiary.findUnique({
        where: { iban: toBeneficiaryIban }
      });

      if (!beneficiary) {
        beneficiary = await tx.beneficiary.create({
          data: {
            name: toBeneficiaryName,
            iban: toBeneficiaryIban,
            ownerId: userId
          }
        });
      }

      const updatedSource = await tx.bankAccount.update({
        where: { id: sourceAccount.id },
        data: { balance: { decrement: amount } }
      });

      const sourceTx = await tx.transaction.create({
        data: {
          type: "TRANSFER",
          amount: amount,
          description: motif || `Virement vers ${toBeneficiaryName}`,
          accountId: sourceAccount.id,
          beneficiaryId: beneficiary.id
        }
      });

      const targetAccount = await tx.bankAccount.findUnique({
        where: { iban: toBeneficiaryIban }
      });

      if (targetAccount) {
        await tx.bankAccount.update({
          where: { id: targetAccount.id },
          data: { balance: { increment: amount } }
        });

        await tx.transaction.create({
          data: {
            type: "DEPOSIT",
            amount: amount,
            description: motif || `Virement reçu de ${sourceAccount.user.firstName} ${sourceAccount.user.lastName}`,
            accountId: targetAccount.id,
          }
        });
      }

      return { sourceTx, updatedBalance: updatedSource.balance };
    });

    return res.status(201).json({ 
      status: "success", 
      data: result 
    });

  } catch (error: any) {
    console.error("Erreur lors de la transaction:", error);
    return res.status(400).json({ 
      message: error.message || "La transaction a échoué" 
    });
  }
};

export { verify, execute };