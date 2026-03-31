export type AccountType = "CHECKING" | "SAVINGS" | "BUSINESS" | "LIVRET_A" | "PEL";

export interface Account {
  id: number;
  type: AccountType;
  iban: string;
  balance: number;
  status: "ACTIVE" | "BLOCKED" | "CLOSED";
  userId: number;
  createdAt: string;
  updatedAt: string;
}