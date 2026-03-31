export type AccountType = "CHECKING" | "SAVINGS" | "BUSINESS" | "LIVRET_A" | "PEL";
export type AccountStatus = "ACTIVE" | "BLOCKED" | "CLOSED";
export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "PAYMENT";

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  beneficiary?: string;
}

export interface BankAccount {
  id: number;
  iban: string;
  type: AccountType;
  balance: number;
  status: AccountStatus;
  createdAt: string;
  owner: {
    firstName: string;
    lastName: string;
    email: string;
  };
  transactions: Transaction[];
}

export const mockAccount: BankAccount = {
  id: 1,
  iban: "FR76 3000 6000 0112 3456 7890 189",
  type: "CHECKING",
  balance: 12450.83,
  status: "ACTIVE",
  createdAt: "2021-03-14T10:00:00.000Z",
  owner: {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
  },
  transactions: [
    {
      id: 1,
      type: "DEPOSIT",
      amount: 2800.0,
      description: "Virement reçu — Employeur SAS",
      date: "2026-03-27T08:30:00.000Z",
    },
    {
      id: 2,
      type: "PAYMENT",
      amount: -89.5,
      description: "Électricité — EDF",
      date: "2026-03-25T14:12:00.000Z",
    },
    {
      id: 3,
      type: "TRANSFER",
      amount: -350.0,
      description: "Virement vers Marie Durand",
      date: "2026-03-22T11:05:00.000Z",
      beneficiary: "Marie Durand",
    },
    {
      id: 4,
      type: "WITHDRAWAL",
      amount: -60.0,
      description: "Retrait DAB — Paris 11e",
      date: "2026-03-20T17:45:00.000Z",
    },
    {
      id: 5,
      type: "PAYMENT",
      amount: -15.99,
      description: "Abonnement Netflix",
      date: "2026-03-18T00:00:00.000Z",
    },
    {
      id: 6,
      type: "DEPOSIT",
      amount: 120.0,
      description: "Remboursement Thomas M.",
      date: "2026-03-15T09:20:00.000Z",
    },
    {
      id: 7,
      type: "PAYMENT",
      amount: -52.3,
      description: "Courses — Carrefour",
      date: "2026-03-12T18:33:00.000Z",
    },
    {
      id: 8,
      type: "TRANSFER",
      amount: -500.0,
      description: "Virement épargne",
      date: "2026-03-10T10:00:00.000Z",
    },
    {
      id: 9,
      type: "DEPOSIT",
      amount: 250.0,
      description: "Remboursement assurance",
      date: "2026-03-05T15:00:00.000Z",
    },
    {
      id: 10,
      type: "PAYMENT",
      amount: -9.99,
      description: "Spotify Premium",
      date: "2026-03-01T00:00:00.000Z",
    },
  ],
};

export const accountTypeLabels: Record<AccountType, string> = {
  CHECKING: "Compte courant",
  SAVINGS: "Compte épargne",
  BUSINESS: "Compte professionnel",
  LIVRET_A: "Livret A",
  PEL: "PEL (Plan Épargne Logement)",
};

export const transactionTypeLabels: Record<TransactionType, string> = {
  DEPOSIT: "Dépôt",
  WITHDRAWAL: "Retrait",
  TRANSFER: "Virement",
  PAYMENT: "Paiement",
};