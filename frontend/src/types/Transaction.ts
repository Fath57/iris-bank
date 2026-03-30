export type AccountType = "CHECKING" | "SAVINGS" | "BUSINESS";
export type AccountStatus = "ACTIVE" | "BLOCKED" | "CLOSED";
export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "PAYMENT";

export interface Beneficiary {
  id: number;
  name: string;
  iban: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  description?: string | null;
  date: string;
  accountId: number;
  beneficiaryId?: number | null;
  beneficiary?: Beneficiary | null;
  createdAt: string;
  updatedAt: string;
}

export interface BankAccount {
  id: number;
  iban: string;
  type: AccountType;
  balance: number;
  status: AccountStatus;
  userId: number;
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
}

// GET /accounts/getByUser
export interface GetUserAccountsResponse {
  status: "success";
  data: {
    totalBalance: number;
    accounts: BankAccount[];
  };
}

// GET /accounts/:id
export interface GetAccountByIdResponse {
  status: "success";
  data: BankAccount;
}

// POST /transactions/verify
export interface VerifyTransferPayload {
  fromAccountIban: string;
}

// POST /transactions/execute
export interface ExecuteTransferPayload {
  fromAccountIban: string;
  toBeneficiaryIban: string;
  toBeneficiaryName: string;
  amount: number;
  motif?: string;
}

export interface ExecuteTransferResponse {
  status: "success";
  data: {
    sourceTx: Transaction;
    updatedBalance: number;
  };
}