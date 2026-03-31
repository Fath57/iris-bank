import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminRoleMiddleware } from '../middleware/adminRole.middleware.js';
import { validateRequest } from '../middleware/validateRequest.middleware.js';
import {
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  searchClients,
  getAllAccounts,
  getClientAccounts,
  blockAccount,
  unblockAccount,
  getAccountTransactions,
  getStats,
} from '../controller/admin.controller.js';
import {
  updateClientSchema,
  blockAccountSchema,
  unblockAccountSchema,
} from '../validators/admin.validators.js';

const router = Router();

/**
 * Toutes les routes admin nécessitent une authentification
 * et un rôle ADMIN ou SUPPORT
 */
router.use(authMiddleware);
router.use(adminRoleMiddleware);

/**
 * ROUTES DE GESTION DES CLIENTS
 */

// Lister tous les clients
router.get('/clients', getAllClients);

// Rechercher des clients
router.get('/clients/search', searchClients);

// Détails d'un client avec ses comptes
router.get('/clients/:id', getClientById);

// Mettre à jour les informations d'un client
router.put('/clients/:id', validateRequest(updateClientSchema), updateClient);

// Supprimer un client (soft delete)
router.delete('/clients/:id', deleteClient);

/**
 * ROUTES DE GESTION DES COMPTES
 */

// Lister tous les comptes
router.get('/accounts', getAllAccounts);

// Récupérer les comptes d'un client spécifique
router.get('/clients/:id/accounts', getClientAccounts);

// Consulter l'historique des transactions d'un compte
router.get('/accounts/:id/transactions', getAccountTransactions);

// Bloquer un compte
router.patch('/accounts/:id/block', validateRequest(blockAccountSchema), blockAccount);

// Débloquer un compte
router.patch('/accounts/:id/unblock', validateRequest(unblockAccountSchema), unblockAccount);

/**
 * ROUTES DE STATISTIQUES
 */

// Obtenir les statistiques globales
router.get('/stats', getStats);

export default router;
