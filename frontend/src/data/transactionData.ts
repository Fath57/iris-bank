export type AccountType = "CHECKING" | "SAVINGS" | "BUSINESS";
export type AccountStatus = "ACTIVE" | "BLOCKED" | "CLOSED";
export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "PAYMENT";

export interface Beneficiary {
  id: number;
  name: string;
  iban: string;
}

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  description?: string;
  date: string;
  accountId: number;
  beneficiary?: Beneficiary;
  balanceAfter: number;
}

export interface BankAccount {
  id: number;
  iban: string;
  type: AccountType;
  balance: number;
  status: AccountStatus;
}

export const mockAccounts: BankAccount[] = [
  {
    id: 1,
    iban: "FR76 3000 6000 0112 3456 7890 189",
    type: "CHECKING",
    balance: 4250.0,
    status: "ACTIVE",
  },
  {
    id: 2,
    iban: "FR76 1820 6000 0204 9876 5432 167",
    type: "SAVINGS",
    balance: 12800.5,
    status: "ACTIVE",
  },
  {
    id: 3,
    iban: "FR76 4255 9000 0309 1111 2222 344",
    type: "BUSINESS",
    balance: 31500.0,
    status: "ACTIVE",
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "TRANSFER",
    amount: -900.0,
    description: "Loyer mars",
    date: "2024-03-28",
    accountId: 1,
    beneficiary: { id: 1, name: "Martin Dupont", iban: "FR76 1234 5678 9012 3456 7890 123" },
    balanceAfter: 4250.0,
  },
  {
    id: 2,
    type: "DEPOSIT",
    amount: 2400.0,
    description: "Salaire mars",
    date: "2024-03-26",
    accountId: 1,
    balanceAfter: 5150.0,
  },
  {
    id: 3,
    type: "PAYMENT",
    amount: -87.4,
    description: "Courses Carrefour",
    date: "2024-03-24",
    accountId: 1,
    balanceAfter: 2750.0,
  },
  {
    id: 4,
    type: "WITHDRAWAL",
    amount: -200.0,
    description: "Retrait DAB",
    date: "2024-03-22",
    accountId: 1,
    balanceAfter: 2837.4,
  },
  {
    id: 5,
    type: "DEPOSIT",
    amount: 150.0,
    description: "Remboursement dîner",
    date: "2024-03-19",
    accountId: 1,
    beneficiary: { id: 2, name: "Pierre Lefebvre", iban: "FR76 9876 5432 1098 7654 3210 987" },
    balanceAfter: 3037.4,
  },
  {
    id: 6,
    type: "PAYMENT",
    amount: -17.99,
    description: "Abonnement Netflix",
    date: "2024-03-15",
    accountId: 1,
    balanceAfter: 2887.4,
  },
  {
    id: 7,
    type: "TRANSFER",
    amount: -250.0,
    description: "Remboursement prêt",
    date: "2024-03-12",
    accountId: 1,
    beneficiary: { id: 3, name: "Crédit Mutuel", iban: "FR76 4321 0987 6543 2109 8765 432" },
    balanceAfter: 2905.39,
  },
  {
    id: 8,
    type: "DEPOSIT",
    amount: 500.0,
    description: "Virement reçu",
    date: "2024-03-10",
    accountId: 1,
    beneficiary: { id: 4, name: "Sophie Bernard", iban: "FR76 1111 2222 3333 4444 5555 666" },
    balanceAfter: 3155.39,
  },
  {
    id: 9,
    type: "PAYMENT",
    amount: -56.3,
    description: "EDF facture électricité",
    date: "2024-03-08",
    accountId: 1,
    balanceAfter: 2655.39,
  },
  {
    id: 10,
    type: "WITHDRAWAL",
    amount: -100.0,
    description: "Retrait DAB",
    date: "2024-03-05",
    accountId: 1,
    balanceAfter: 2711.69,
  },
  {
    id: 11,
    type: "PAYMENT",
    amount: -9.99,
    description: "Spotify Premium",
    date: "2024-03-03",
    accountId: 1,
    balanceAfter: 2811.69,
  },
  {
    id: 12,
    type: "TRANSFER",
    amount: -400.0,
    description: "Virement épargne",
    date: "2024-03-01",
    accountId: 1,
    beneficiary: { id: 5, name: "Livret A Personnel", iban: "FR76 7777 8888 9999 0000 1111 222" },
    balanceAfter: 2821.68,
  },
  // Compte épargne (id: 2)
  {
    id: 13,
    type: "DEPOSIT",
    amount: 400.0,
    description: "Virement depuis compte courant",
    date: "2024-03-01",
    accountId: 2,
    balanceAfter: 12800.5,
  },
  {
    id: 14,
    type: "DEPOSIT",
    amount: 200.0,
    description: "Intérêts annuels",
    date: "2024-01-01",
    accountId: 2,
    balanceAfter: 12400.5,
  },
  // Compte pro (id: 3)
  {
    id: 15,
    type: "DEPOSIT",
    amount: 5000.0,
    description: "Règlement client Acme SA",
    date: "2024-03-25",
    accountId: 3,
    beneficiary: { id: 6, name: "Acme SA", iban: "FR76 9999 8888 7777 6666 5555 444" },
    balanceAfter: 31500.0,
  },
  {
    id: 16,
    type: "PAYMENT",
    amount: -1200.0,
    description: "Loyer local commercial",
    date: "2024-03-05",
    accountId: 3,
    balanceAfter: 26500.0,
  },
];