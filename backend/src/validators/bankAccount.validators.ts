import {z} from 'zod'

const createBankAccountSchema = z.object({
    type: z.enum(["CHECKING", "SAVINGS", "BUSINESS"], {
      error: "Type doit être CHECKING, SAVINGS ou BUSINESS",
    }),
});

export { createBankAccountSchema }