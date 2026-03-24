import { z } from "zod";

const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;

export const verifyTransactionSchema = z.object({
  fromAccountIban: z.string().regex(ibanRegex, "L'IBAN source est invalide"),
  toBeneficiaryIban: z.string().regex(ibanRegex, "L'IBAN de destination est invalide"),
  amount: z.number().positive("Le montant doit être strictement supérieur à 0"),
});

export const executeTransactionSchema = verifyTransactionSchema.extend({
  mode: z.enum(["interne", "externe"]),
  toBeneficiaryName: z.string().min(1, "Le nom du bénéficiaire est requis"),
  motif: z.string().max(140).optional(),
});

export const depositSchema = z.object({
  accountId: z.number().int().positive("L'identifiant du compte est invalide"),
  amount: z.number().positive("Le montant doit être strictement supérieur à 0"),
  description: z.string().max(140).optional(),
});

export const withdrawalSchema = depositSchema;