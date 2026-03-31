import { z } from 'zod';

/**
 * Schéma pour la mise à jour des informations d'un client
 */
export const updateClientSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").optional(),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères").optional(),
  email: z.string().email("Email invalide").optional(),
  phoneNumber: z.string().regex(/^0[1-9]\d{8}$/, "Numéro de téléphone invalide").optional(),
  address: z.object({
    street: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
    city: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
    state: z.string().min(2, "La région doit contenir au moins 2 caractères"),
    zipCode: z.string().regex(/^\d{5}$/, "Code postal invalide (5 chiffres)"),
    country: z.string().min(2, "Le pays doit contenir au moins 2 caractères"),
  }).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "Au moins un champ doit être fourni pour la mise à jour"
});

/**
 * Schéma pour bloquer un compte
 */
export const blockAccountSchema = z.object({
  reason: z.string().min(10, "La raison du blocage doit contenir au moins 10 caractères"),
});

/**
 * Schéma pour débloquer un compte
 */
export const unblockAccountSchema = z.object({
  reason: z.string().min(10, "La raison du déblocage doit contenir au moins 10 caractères").optional(),
});

/**
 * Schéma pour la recherche de clients
 */
export const searchClientsSchema = z.object({
  q: z.string().min(1, "Le terme de recherche doit contenir au moins 1 caractère"),
});
