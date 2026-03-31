import { z } from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Le mot de passe actuel est requis"),
  newPassword: z.string().min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères"),
});

export const toggle2FASchema = z.object({
  enabled: z.boolean({ required_error: "Le paramètre 'enabled' est requis", invalid_type_error: "Le paramètre 'enabled' doit être un booléen" }),
});
