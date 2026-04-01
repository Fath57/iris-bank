import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatAmount } from "@/lib/format";
import { ACCOUNT_META } from "@/lib/accountMeta";

interface Account {
  id: string;
  type: string;
  iban: string;
  balance: number | string;
}

interface AccountSelectorProps {
  accounts: Account[];
  selectedAccountId: string;
  onSelect: (id: string) => void;
}

export function AccountSelector({ accounts, selectedAccountId, onSelect }: AccountSelectorProps) {
  return (
    <div className="animate-fade-up">
      <p className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium mb-3">
        Compte concerné
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {accounts.map((acc) => {
          const m = ACCOUNT_META[acc.type] ?? ACCOUNT_META.CHECKING;
          const selected = acc.id === selectedAccountId;
          return (
            <button
              key={acc.id}
              onClick={() => onSelect(acc.id)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all duration-200 space-y-2",
                selected
                  ? "border-primary/30 bg-primary/5 shadow-sm ring-1 ring-primary/10 dark:bg-primary/10"
                  : "border-border bg-card hover:bg-muted/50 hover:border-border/80"
              )}
            >
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5 rounded-full", m.badgeClass)}>
                  {m.label}
                </Badge>
                {selected && <div className="h-2 w-2 rounded-full bg-primary" />}
              </div>
              <p className="text-xs font-medium text-foreground leading-tight">{m.name}</p>
              <p className="text-sm font-bold tabular-nums text-foreground">{formatAmount(Number(acc.balance))}</p>
              <p className="font-mono text-[10px] text-muted-foreground/50 truncate">{acc.iban}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
