import type { Request, Response } from 'express';
import { prisma } from '../config/db.js';

/**
 * GESTION DES CLIENTS
 */

/**
 * Lister tous les clients
 * GET /admin/clients
 */
export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.user.findMany({
      where: {
        deletedAt: null, // Exclure les clients supprimés
        role: 'USER', // Seulement les clients, pas les admins
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        address: {
          select: {
            street: true,
            city: true,
            state: true,
            zipCode: true,
            country: true,
          }
        },
        _count: {
          select: {
            accounts: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return res.status(200).json({
      status: "success",
      data: {
        clients,
        total: clients.length,
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

/**
 * Obtenir les détails d'un client avec ses comptes
 * GET /admin/clients/:id
 */
export const getClientById = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.id);

    if (isNaN(clientId)) {
      return res.status(400).json({
        message: "ID client invalide"
      });
    }

    const client = await prisma.user.findUnique({
      where: {
        id: clientId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        address: {
          select: {
            street: true,
            city: true,
            state: true,
            zipCode: true,
            country: true,
          }
        },
        accounts: {
          select: {
            id: true,
            iban: true,
            type: true,
            balance: true,
            status: true,
            createdAt: true,
            _count: {
              select: {
                transactions: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc',
          }
        },
        beneficiaries: {
          select: {
            id: true,
            name: true,
            iban: true,
            createdAt: true,
          }
        },
        _count: {
          select: {
            accounts: true,
            beneficiaries: true,
          }
        }
      }
    });

    if (!client) {
      return res.status(404).json({
        message: "Client non trouvé"
      });
    }

    // Vérifier que c'est bien un client (pas un admin)
    if (client.role !== 'USER') {
      return res.status(400).json({
        message: "Cet utilisateur n'est pas un client"
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        client
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du client:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

/**
 * Mettre à jour les informations d'un client
 * PUT /admin/clients/:id
 */
export const updateClient = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.id);

    if (isNaN(clientId)) {
      return res.status(400).json({
        message: "ID client invalide"
      });
    }

    const { firstName, lastName, email, phoneNumber, address } = req.body;

    // Vérifier que le client existe
    const existingClient = await prisma.user.findUnique({
      where: { id: clientId },
    });

    if (!existingClient) {
      return res.status(404).json({
        message: "Client non trouvé"
      });
    }

    if (existingClient.role !== 'USER') {
      return res.status(400).json({
        message: "Impossible de modifier un administrateur"
      });
    }

    // Si l'email change, vérifier qu'il n'est pas déjà utilisé
    if (email && email !== existingClient.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email }
      });

      if (emailExists) {
        return res.status(400).json({
          message: "Cet email est déjà utilisé"
        });
      }
    }

    // Mettre à jour dans une transaction
    const updatedClient = await prisma.$transaction(async (tx) => {
      // Mise à jour de l'utilisateur
      const user = await tx.user.update({
        where: { id: clientId },
        data: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(email && { email }),
          ...(phoneNumber && { phoneNumber }),
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          role: true,
          updatedAt: true,
        }
      });

      // Mise à jour de l'adresse si fournie
      if (address) {
        await tx.address.upsert({
          where: { userId: clientId },
          create: {
            userId: clientId,
            ...address,
          },
          update: address,
        });
      }

      return user;
    });

    return res.status(200).json({
      status: "success",
      message: "Client mis à jour avec succès",
      data: {
        client: updatedClient
      }
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du client:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

/**
 * Supprimer un client (soft delete)
 * DELETE /admin/clients/:id
 */
export const deleteClient = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.id);

    if (isNaN(clientId)) {
      return res.status(400).json({
        message: "ID client invalide"
      });
    }

    // Vérifier que le client existe
    const existingClient = await prisma.user.findUnique({
      where: { id: clientId },
      include: {
        accounts: true,
      }
    });

    if (!existingClient) {
      return res.status(404).json({
        message: "Client non trouvé"
      });
    }

    if (existingClient.role !== 'USER') {
      return res.status(400).json({
        message: "Impossible de supprimer un administrateur"
      });
    }

    // Vérifier s'il a des comptes actifs avec du solde
    const activeAccountsWithBalance = existingClient.accounts.filter(
      acc => acc.status === 'ACTIVE' && acc.balance > 0
    );

    if (activeAccountsWithBalance.length > 0) {
      return res.status(400).json({
        message: "Impossible de supprimer un client avec des comptes actifs ayant un solde positif"
      });
    }

    // Soft delete
    const deletedClient = await prisma.user.update({
      where: { id: clientId },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        deletedAt: true,
      }
    });

    return res.status(200).json({
      status: "success",
      message: "Client supprimé avec succès",
      data: {
        client: deletedClient
      }
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du client:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

/**
 * Rechercher des clients par nom, email ou IBAN
 * GET /admin/clients/search?q=terme
 */
export const searchClients = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q as string;

    if (!searchTerm || searchTerm.trim().length === 0) {
      return res.status(400).json({
        message: "Le terme de recherche est requis"
      });
    }

    const clients = await prisma.user.findMany({
      where: {
        AND: [
          { deletedAt: null },
          { role: 'USER' },
          {
            OR: [
              { firstName: { contains: searchTerm, mode: 'insensitive' } },
              { lastName: { contains: searchTerm, mode: 'insensitive' } },
              { email: { contains: searchTerm, mode: 'insensitive' } },
              { phoneNumber: { contains: searchTerm } },
              {
                accounts: {
                  some: {
                    iban: { contains: searchTerm, mode: 'insensitive' }
                  }
                }
              }
            ]
          }
        ]
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        createdAt: true,
        address: {
          select: {
            city: true,
            country: true,
          }
        },
        accounts: {
          select: {
            iban: true,
            type: true,
            balance: true,
            status: true,
          }
        },
        _count: {
          select: {
            accounts: true,
          }
        }
      },
      take: 50, // Limiter les résultats
    });

    return res.status(200).json({
      status: "success",
      data: {
        clients,
        total: clients.length,
        searchTerm,
      }
    });
  } catch (error) {
    console.error("Erreur lors de la recherche de clients:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

/**
 * GESTION DES COMPTES
 */

/**
 * Lister tous les comptes bancaires
 * GET /admin/accounts
 */
export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await prisma.bankAccount.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          }
        },
        _count: {
          select: {
            transactions: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return res.status(200).json({
      status: "success",
      data: {
        accounts,
        total: accounts.length,
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des comptes:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

/**
 * Récupérer tous les comptes d'un client
 * GET /admin/clients/:id/accounts
 */
export const getClientAccounts = async (req: Request, res: Response) => {
  try {
    const clientId = Number(req.params.id);

    if (isNaN(clientId)) {
      return res.status(400).json({
        message: "ID client invalide"
      });
    }

    const accounts = await prisma.bankAccount.findMany({
      where: {
        userId: clientId,
      },
      include: {
        _count: {
          select: {
            transactions: true,
          }
        },
        transactions: {
          take: 5,
          orderBy: {
            date: 'desc',
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return res.status(200).json({
      status: "success",
      data: {
        accounts,
        total: accounts.length,
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des comptes du client:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

/**
 * Bloquer un compte
 * PATCH /admin/accounts/:id/block
 */
export const blockAccount = async (req: Request, res: Response) => {
  try {
    const accountId = Number(req.params.id);
    const { reason } = req.body;

    if (isNaN(accountId)) {
      return res.status(400).json({
        message: "ID de compte invalide"
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Utilisateur non authentifié"
      });
    }

    const account = await prisma.bankAccount.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      return res.status(404).json({
        message: "Compte non trouvé"
      });
    }

    if (account.status === 'BLOCKED') {
      return res.status(400).json({
        message: "Ce compte est déjà bloqué"
      });
    }

    if (account.status === 'CLOSED') {
      return res.status(400).json({
        message: "Impossible de bloquer un compte fermé"
      });
    }

    // Bloquer le compte et créer un log d'audit
    const result = await prisma.$transaction(async (tx) => {
      const blockedAccount = await tx.bankAccount.update({
        where: { id: accountId },
        data: {
          status: 'BLOCKED',
          updatedAt: new Date(),
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            }
          }
        }
      });

      // Créer un log d'audit
      await tx.auditLog.create({
        data: {
          userId: req.user!.id,
          action: `Compte bloqué - IBAN: ${account.iban} - Raison: ${reason}`,
        }
      });

      return blockedAccount;
    });

    return res.status(200).json({
      status: "success",
      message: "Compte bloqué avec succès",
      data: {
        account: result
      }
    });
  } catch (error) {
    console.error("Erreur lors du blocage du compte:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

/**
 * Débloquer un compte
 * PATCH /admin/accounts/:id/unblock
 */
export const unblockAccount = async (req: Request, res: Response) => {
  try {
    const accountId = Number(req.params.id);
    const { reason } = req.body;

    if (isNaN(accountId)) {
      return res.status(400).json({
        message: "ID de compte invalide"
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Utilisateur non authentifié"
      });
    }

    const account = await prisma.bankAccount.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      return res.status(404).json({
        message: "Compte non trouvé"
      });
    }

    if (account.status !== 'BLOCKED') {
      return res.status(400).json({
        message: "Ce compte n'est pas bloqué"
      });
    }

    // Débloquer le compte et créer un log d'audit
    const result = await prisma.$transaction(async (tx) => {
      const unblockedAccount = await tx.bankAccount.update({
        where: { id: accountId },
        data: {
          status: 'ACTIVE',
          updatedAt: new Date(),
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            }
          }
        }
      });

      // Créer un log d'audit
      await tx.auditLog.create({
        data: {
          userId: req.user!.id,
          action: `Compte débloqué - IBAN: ${account.iban}${reason ? ` - Raison: ${reason}` : ''}`,
        }
      });

      return unblockedAccount;
    });

    return res.status(200).json({
      status: "success",
      message: "Compte débloqué avec succès",
      data: {
        account: result
      }
    });
  } catch (error) {
    console.error("Erreur lors du déblocage du compte:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

/**
 * Consulter l'historique des transactions d'un compte
 * GET /admin/accounts/:id/transactions
 */
export const getAccountTransactions = async (req: Request, res: Response) => {
  try {
    const accountId = Number(req.params.id);

    if (isNaN(accountId)) {
      return res.status(400).json({
        message: "ID de compte invalide"
      });
    }

    const account = await prisma.bankAccount.findUnique({
      where: { id: accountId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          }
        }
      }
    });

    if (!account) {
      return res.status(404).json({
        message: "Compte non trouvé"
      });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        accountId: accountId,
      },
      include: {
        beneficiary: {
          select: {
            name: true,
            iban: true,
          }
        }
      },
      orderBy: {
        date: 'desc',
      }
    });

    return res.status(200).json({
      status: "success",
      data: {
        account: {
          id: account.id,
          iban: account.iban,
          type: account.type,
          balance: account.balance,
          status: account.status,
          user: account.user,
        },
        transactions,
        total: transactions.length,
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

/**
 * STATISTIQUES
 */

/**
 * Obtenir les statistiques globales
 * GET /admin/stats
 */
export const getStats = async (req: Request, res: Response) => {
  try {
    // Compter les clients (excluant les admins et les supprimés)
    const totalClients = await prisma.user.count({
      where: {
        role: 'USER',
        deletedAt: null,
      }
    });

    // Compter tous les comptes
    const totalAccounts = await prisma.bankAccount.count();

    // Compter les comptes par statut
    const accountsByStatus = await prisma.bankAccount.groupBy({
      by: ['status'],
      _count: {
        id: true,
      }
    });

    // Somme totale des soldes
    const balanceSum = await prisma.bankAccount.aggregate({
      _sum: {
        balance: true,
      }
    });

    // Compter toutes les transactions
    const totalTransactions = await prisma.transaction.count();

    // Transactions par type
    const transactionsByType = await prisma.transaction.groupBy({
      by: ['type'],
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
      }
    });

    // Comptes bloqués
    const blockedAccounts = accountsByStatus.find(s => s.status === 'BLOCKED')?._count.id || 0;

    // Clients récents (derniers 30 jours)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentClients = await prisma.user.count({
      where: {
        role: 'USER',
        deletedAt: null,
        createdAt: {
          gte: thirtyDaysAgo,
        }
      }
    });

    return res.status(200).json({
      status: "success",
      data: {
        clients: {
          total: totalClients,
          recent: recentClients,
        },
        accounts: {
          total: totalAccounts,
          byStatus: accountsByStatus,
          blocked: blockedAccounts,
        },
        balance: {
          total: balanceSum._sum.balance || 0,
        },
        transactions: {
          total: totalTransactions,
          byType: transactionsByType,
        }
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};
