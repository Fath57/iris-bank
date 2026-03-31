export type AccountType = 'CHECKING' | 'SAVINGS' | 'BUSINESS' | 'LIVRET_A' | 'PEL';
 
export interface CreateAccountPayload {
  type: AccountType;
  userId: number;
  balance: number;
}
 
export interface CreateAccountForm {
  type: AccountType;
  balance: string;
}
 