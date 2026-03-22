import z from "zod";


const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;

export const addBeneficiarySchema = z.object({
  name: z.string().min(1, "Le nom du bénéficiaire est requis"),
  iban: z.string().regex(ibanRegex, "L'IBAN du bénéficiaire est invalide"),
});