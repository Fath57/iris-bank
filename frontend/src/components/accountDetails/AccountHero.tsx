import type { AccountStatus, AccountType } from "@/data/accountDetails";
import { accountTypeLabels } from "@/data/accountDetails";
import { formatAmount, formatDateLong } from "@/lib/format";
import { statusConfig } from "@/config/account.config";

interface AccountHeroProps {
  type: AccountType;
  status: AccountStatus;
  balance: number;
  iban: string;
  createdAt: string;
  ownerName: string;
}

export function AccountHero({ type, status, balance, iban, createdAt, ownerName }: AccountHeroProps) {
  const s = statusConfig[status];

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-6">
        
        {/* Ligne du haut : Type & Statut */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-secondary text-secondary-foreground">
              {accountTypeLabels[type]}
            </span>
            <div className="flex items-center gap-1.5 px-2 py-1">
              <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground italic">
            {ownerName}
          </span>
        </div>

        {/* Solde principal */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-tight">Solde disponible</p>
          <p className="text-4xl font-bold tracking-tighter tabular-nums text-foreground">
            {formatAmount(balance)}
          </p>
        </div>

        {/* Détails IBAN / Date */}
        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-border/50">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">IBAN</p>
            <p className="text-sm font-mono text-foreground break-all tracking-tight">
              {iban}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Depuis le</p>
            <p className="text-sm font-medium text-foreground">
              {formatDateLong(createdAt)}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}