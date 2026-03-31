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
import { ArrowLeftRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AccountHeaderProps {
  accounts: BankAccount[];
  selectedId: number;
  onSelect: (id: number) => void;
  onNewTransfer: () => void;
}

const accountTypeLabel: Record<BankAccount["type"], string> = {
  CHECKING: "Compte courant",
  SAVINGS: "Livret épargne",
  BUSINESS: "Compte professionnel",
  LIVRET_A: "Livret A",
  PEL: "PEL",
};

export default function AccountHeader({
  accounts,
  selectedId,
  onSelect,
  onNewTransfer,
}: AccountHeaderProps) {
  const account = accounts.find((a) => a.id === selectedId);

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Select
          value={String(selectedId)}
          onValueChange={(v) => onSelect(Number(v))}
        >
          <SelectTrigger className="h-10 w-[280px] font-mono text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((a) => (
              <SelectItem key={a.id} value={String(a.id)}>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs">{a.iban}</span>
                  <Badge variant="secondary" className="text-[10px] font-normal ml-1">
                    {accountTypeLabel[a.type]}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {account && (
          <div>
            <span className="text-2xl font-bold text-foreground">
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

      <Link to="/transactions/new" className="text-sm text-primary hover:underline">
        <Button onClick={onNewTransfer} className="cursor-pointer gap-2">
          <ArrowLeftRight className="h-4 w-4" />
          Nouveau virement
        </Button>
      </Link>
    </div>
  );
}