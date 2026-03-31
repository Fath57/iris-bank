import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware pour vérifier que l'utilisateur connecté est administrateur
 * Doit être utilisé après authMiddleware
 */
export const adminRoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Vérifier que l'utilisateur est authentifié
  if (!req.user) {
    return res.status(401).json({
      message: "Non authentifié. Veuillez vous connecter."
    });
  }

  // Vérifier que l'utilisateur a le rôle ADMIN ou SUPPORT
  if (req.user.role !== 'ADMIN' && req.user.role !== 'SUPPORT') {
    return res.status(403).json({
      message: "Accès interdit. Cette ressource nécessite des privilèges administrateur."
    });
  }

  // L'utilisateur est bien admin, continuer
  next();
};

/**
 * Middleware pour vérifier que l'utilisateur est SUPER ADMIN (ADMIN uniquement, pas SUPPORT)
 */
export const superAdminRoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Vérifier que l'utilisateur est authentifié
  if (!req.user) {
    return res.status(401).json({
      message: "Non authentifié. Veuillez vous connecter."
    });
  }

  // Vérifier que l'utilisateur a le rôle ADMIN
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      message: "Accès interdit. Cette ressource nécessite des privilèges super administrateur."
    });
  }

  // L'utilisateur est bien super admin, continuer
  next();
};
