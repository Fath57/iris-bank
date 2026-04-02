import type { Account } from "@/types/Account";

export const mockAccounts: Omit<Account, 'userId' | 'createdAt' | 'updatedAt'>[] = [
  {
    id: 1,
    iban: "FR76 •••• •••• 4821",
    type: "CHECKING",
    balance: 1243.22,
    status: "ACTIVE",
  },
  {
    id: 2,
    iban: "FR76 •••• •••• 9034",
    type: "SAVINGS",
    balance: 3600.0,
    status: "ACTIVE",
  },
  {
    id: 3,
    iban: "FR76 •••• •••• 2210",
    type: "BUSINESS",
    balance: -16.68,
    status: "ACTIVE",
  },
];
