import { type AccountStatus, type TransactionType } from "@/data/accountDetails";

export const statusConfig: Record<AccountStatus, { label: string; dot: string }> = {
  ACTIVE:  { label: "Actif", dot: "bg-emerald-500" },
  BLOCKED: { label: "Bloqué", dot: "bg-destructive" },
  CLOSED:  { label: "Clôturé", dot: "bg-slate-300" },
};

export const txConfig: Record<TransactionType, { icon: string; showPlus?: boolean }> = {
  DEPOSIT:    { icon: "arrow-down-left", showPlus: true },
  WITHDRAWAL: { icon: "arrow-up-right" },
  TRANSFER:   { icon: "arrow-right-left" },
  PAYMENT:    { icon: "credit-card" },
};

export type Filter = TransactionType | "ALL";
export const FILTERS: { value: Filter; label: string }[] = [
  { value: "ALL", label: "Tout" },
  { value: "DEPOSIT", label: "Dépôts" },
  { value: "WITHDRAWAL", label: "Retraits" },
  { value: "TRANSFER", label: "Virements" },
  { value: "PAYMENT", label: "Paiements" },
];