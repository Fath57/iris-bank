import {z} from 'zod'

const createBankAccountSchema = z.object({
    type: z.enum(["CHECKING", "SAVINGS", "BUSINESS", "LIVRET_A", "PEL"], {
      error: "Type doit être CHECKING, SAVINGS, BUSINESS, LIVRET_A ou PEL",
    }),
});

export { createBankAccountSchema }