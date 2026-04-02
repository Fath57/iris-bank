import { type AccountStatus, type TransactionType } from "@/data/accountDetails";

export const statusConfig: Record<AccountStatus, { label: string; dot: string }> = {
  ACTIVE:  { label: "Actif", dot: "bg-emerald-500" },
  BLOCKED: { label: "Bloqué", dot: "bg-destructive" },
  CLOSED:  { label: "Clôturé", dot: "bg-slate-300" },
};

export const txConfig: Record<TransactionType, { icon: string; showPlus?: boolean; badgeClass: string }> = {
  DEPOSIT:    { icon: "arrow-down-left", showPlus: true, badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  WITHDRAWAL: { icon: "arrow-up-right", badgeClass: "border-red-200 bg-red-50 text-red-700" },
  TRANSFER:   { icon: "arrow-right-left", badgeClass: "border-blue-200 bg-blue-50 text-blue-700" },
  PAYMENT:    { icon: "credit-card", badgeClass: "border-orange-200 bg-orange-50 text-orange-700" },
};

export type Filter = TransactionType | "ALL";
export const FILTERS: { value: Filter; label: string }[] = [
  { value: "ALL", label: "Tout" },
  { value: "DEPOSIT", label: "Dépôts" },
  { value: "WITHDRAWAL", label: "Retraits" },
  { value: "TRANSFER", label: "Virements" },
  { value: "PAYMENT", label: "Paiements" },
];