import type { Account } from "./Account";
import type { Transaction } from "./Transaction";

export interface AdminStats {
  clients: {
    total: number;
    recent: number;
  };
  accounts: {
    total: number;
    byStatus: Array<{
      status: "ACTIVE" | "BLOCKED" | "CLOSED";
      _count: {
        id: number;
      };
    }>;
    blocked: number;
  };
  balance: {
    total: number | string;
  };
  transactions: {
    total: number;
    byType: Array<{
      type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "PAYMENT";
      _count: {
        id: number;
      };
      _sum: {
        amount: number;
      };
    }>;
  };
}

export interface ClientAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Client {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: "USER" | "ADMIN" | "SUPPORT";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  address: ClientAddress | null;
  _count?: {
    accounts: number;
    beneficiaries?: number;
  };
  accounts?: Account[];
  beneficiaries?: Array<{
    id: number;
    name: string;
    iban: string;
    createdAt: string;
  }>;
}

export interface ClientWithAccounts extends Client {
  accounts: Account[];
}

export interface AccountWithUser extends Account {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  _count: {
    transactions: number;
  };
}

export interface AccountWithTransactions extends AccountWithUser {
  transactions: Transaction[];
}

export interface UpdateClientData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: ClientAddress;
}

export interface BlockAccountData {
  reason: string;
}

export interface UnblockAccountData {
  reason?: string;
}

export interface SearchClientsParams {
  q: string;
}

export interface AdminApiResponse<T> {
  status: "success" | "error";
  data?: T;
  message?: string;
}
