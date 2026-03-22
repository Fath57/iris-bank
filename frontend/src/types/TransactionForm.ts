export interface TransactionFormValues {
  mode: "externe" | "interne";
  fromAccountName: string;
  fromAccountIban: string;
  fromAccountBalance: number;
  toBeneficiaryName: string;
  toBeneficiaryIban: string;
  amount: number;
  motif: string;
}