export type AccountType = "courant" | "epargne" | "joint";

export interface Transaction {
  id: string;
  label: string;
  date: string;
  amount: number;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  subtype: string;
  iban: string;
  balance: number;
  recentTransactions: Transaction[];
}