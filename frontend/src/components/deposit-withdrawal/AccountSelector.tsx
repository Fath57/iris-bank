import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatAmount } from "@/lib/format";

export const ACCOUNT_META: Record<string, { name: string; label: string; badgeClass: string }> = {
  CHECKING: { name: "Compte Courant",   label: "Courant", badgeClass: "bg-blue-50 text-blue-700 border-blue-200" },
  SAVINGS:  { name: "Livret d'Épargne", label: "Épargne", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  BUSINESS: { name: "Compte Pro",       label: "Pro",     badgeClass: "bg-violet-50 text-violet-700 border-violet-200" },
  LIVRET_A: { name: "Livret A",         label: "Livret A", badgeClass: "bg-purple-50 text-purple-700 border-purple-200" },
  PEL:      { name: "PEL",              label: "PEL",     badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200" },
};

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
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium mb-3">
        Compte concerné
      </p>
      <div className="grid grid-cols-3 gap-3">
        {accounts.map((acc) => {
          const m = ACCOUNT_META[acc.type] ?? ACCOUNT_META.CHECKING;
          const selected = acc.id === selectedAccountId;
          return (
            <button
              key={acc.id}
              onClick={() => onSelect(acc.id)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all space-y-2",
                selected
                  ? "border-foreground/20 bg-background shadow-sm ring-1 ring-foreground/10"
                  : "border-border bg-muted/30 hover:bg-muted/60"
              )}
            >
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5 rounded-full", m.badgeClass)}>
                  {m.label}
                </Badge>
                {selected && <div className="h-2 w-2 rounded-full bg-foreground" />}
              </div>
              <p className="text-xs font-medium text-foreground leading-tight">{m.name}</p>
              <p className="text-sm font-bold tabular-nums">{formatAmount(Number(acc.balance))}</p>
              <p className="font-mono text-[10px] text-muted-foreground/50 truncate">{acc.iban}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}