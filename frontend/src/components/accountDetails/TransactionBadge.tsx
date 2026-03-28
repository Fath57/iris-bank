import type { TransactionType } from "@/data/accountDetails";
import { transactionTypeLabels } from "@/data/accountDetails";
import { txConfig } from "@/config/account.config";

interface TransactionBadgeProps {
  type: TransactionType;
}

export function TransactionBadge({ type }: TransactionBadgeProps) {
  const cfg = txConfig[type];
  
  return (
    <span
      className={`hidden sm:inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-widest flex-shrink-0 ${cfg.badgeClass}`}
    >
      {transactionTypeLabels[type]}
    </span>
  );
}