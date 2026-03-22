import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatAmount } from "@/lib/format";

interface AccountDropdownProps {
  label: "De" | "Vers";
  accounts: any[];
  selectedIban: string;
  disabledIban?: string;
  onSelect: (iban: string, name: string, balance: number) => void;
}

export function AccountDropdown({ label, accounts, selectedIban, disabledIban, onSelect }: AccountDropdownProps) {
  const account = accounts.find((a) => a.iban === selectedIban) ?? accounts[0];

  // Sécurité si l'utilisateur n'a aucun compte
  if (!account) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-border/50 hover:border-border transition-all text-left bg-muted/20">
          <div>
            <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wide mb-0.5">{label}</p>
            <p className="text-sm font-medium">{account.name || 'Compte bancaire'}</p>
            <p className="text-[10px] font-mono text-muted-foreground/40 mt-0.5">{account.iban}</p>
          </div>
          <div className="flex items-center gap-2">
            {label === "De" && (
              <span className="text-sm font-semibold text-emerald-600">{formatAmount(account.balance)}</span>
            )}
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/40" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        {accounts.map((acc) => (
          <DropdownMenuItem
            key={acc.id || acc.iban}
            disabled={acc.iban === disabledIban}
            onSelect={() => onSelect(acc.iban, acc.name || 'Compte bancaire', acc.balance)}
            className="flex justify-between"
          >
            <div>
              <p className="text-sm font-medium">{acc.name || 'Compte bancaire'}</p>
              <p className="text-[10px] font-mono text-muted-foreground/50">{acc.iban}</p>
            </div>
            <span className="text-sm font-semibold text-emerald-600 ml-4">{formatAmount(acc.balance)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}