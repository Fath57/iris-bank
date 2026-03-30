import type { TransactionType, AccountType } from "./Transaction";

// GET /accounts/stats
export interface DashboardLastTransaction {
  id: number;
  type: TransactionType;
  amount: number;
  description?: string | null;
  date: string;
}

export interface DashboardStats {
  totalBalance: number;
  checkingBalance: number;
  savingsBalance: number;
  lastTransaction: DashboardLastTransaction | null;
}

export interface GetDashboardStatsResponse {
  status: "success";
  data: DashboardStats;
}

// GET /transactions/recent
export interface RecentTransaction {
  id: number;
  type: TransactionType;
  amount: number;
  description?: string | null;
  date: string;
  account: {
    type: AccountType;
    iban: string;
  };
  beneficiary?: {
    name: string;
    iban: string;
  } | null;
}

export interface GetRecentTransactionsResponse {
  status: "success";
  data: RecentTransaction[];
}