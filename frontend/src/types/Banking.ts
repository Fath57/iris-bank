export type Op = "DEPOSIT" | "WITHDRAWAL";

export interface Transaction {
  id: string;
  type: string;
  amount: number | string;
  description?: string;
  date: string;
}

export interface Account {
  id: string;
  type: string;
  iban: string;
  balance: number | string;
  transactions?: Transaction[];
}