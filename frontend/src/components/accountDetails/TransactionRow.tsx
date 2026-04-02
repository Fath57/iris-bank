import type { Transaction } from "@/data/accountDetails";
import { txConfig } from "@/config/account.config";
import { formatAmount, formatDateShort } from "@/lib/format";
import { ArrowDownLeft, ArrowUpRight, ArrowRightLeft, CreditCard, ChevronRight } from "lucide-react";

// Mapping des icônes Lucide selon la config
const ICONS = {
  "arrow-down-left": ArrowDownLeft,
  "arrow-up-right": ArrowUpRight,
  "arrow-right-left": ArrowRightLeft,
  "credit-card": CreditCard,
};

interface TransactionRowProps {
  transaction: Transaction;
  isLast?: boolean;
}

export function TransactionRow({ transaction: tx }: TransactionRowProps) {
  const cfg = txConfig[tx.type];
  const Icon = ICONS[cfg.icon as keyof typeof ICONS] || CreditCard;

  return (
    <li className="group flex items-center gap-4 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer relative">
      {/* Icone minimaliste */}
      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground flex-shrink-0">
        <Icon className="h-4 w-4" />
      </div>

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {tx.description}
        </p>
        <p className="text-xs text-muted-foreground tabular-nums">
          {formatDateShort(tx.date)}
        </p>
      </div>

      {/* Montant - Couleur uniquement pour les dépôts (+) */}
      <div className="text-right flex flex-col items-end gap-1">
        <p className={`text-sm font-semibold tabular-nums ${tx.amount > 0 ? "text-emerald-600" : "text-foreground"}`}>
          {tx.amount > 0 ? "+" : ""}{formatAmount(tx.amount)}
        </p>
        <ChevronRight className="h-3 w-3 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
      </div>
    </li>
  );
}