import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BankAccount } from "@/types/Transaction";
import { ACCOUNT_META } from "@/lib/accountMeta";
import { ArrowLeftRight } from "lucide-react";

interface AccountHeaderProps {
  accounts: BankAccount[];
  selectedId: number;
  onSelect: (id: number) => void;
  onNewTransfer: () => void;
}

export default function AccountHeader({
  accounts,
  selectedId,
  onSelect,
  onNewTransfer,
}: AccountHeaderProps) {
  const account = accounts.find((a) => a.id === selectedId);

  return (
    <div className="animate-fade-up flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Select
          value={String(selectedId)}
          onValueChange={(v) => onSelect(Number(v))}
        >
          <SelectTrigger className="h-10 w-full sm:w-74 font-mono text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((a) => {
              const meta = ACCOUNT_META[a.type] ?? ACCOUNT_META.CHECKING;
              return (
                <SelectItem key={a.id} value={String(a.id)}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{a.iban}</span>
                    <Badge variant="outline" className={`text-[10px] font-normal ml-1 ${meta.badgeClass}`}>
                      {meta.label}
                    </Badge>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {account && (
          <div>
            <span className="text-2xl font-bold text-foreground tabular-nums">
              {Number(account.balance).toLocaleString("fr-FR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              €
            </span>
            <span className="text-sm text-muted-foreground ml-2">solde actuel</span>
          </div>
        )}
      </div>

      <Button onClick={onNewTransfer} className="gap-2 w-full sm:w-auto">
        <ArrowLeftRight className="h-4 w-4" />
        Nouveau virement
      </Button>
    </div>
  );
}
