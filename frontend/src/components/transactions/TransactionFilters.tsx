import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { TransactionType } from "@/types/Transaction";

export interface Filters {
  search: string;
  type: TransactionType | "ALL";
  dateFrom: string;
  dateTo: string;
  amountMax: string;
}

interface TransactionFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const typeOptions: { value: TransactionType | "ALL"; label: string }[] = [
  { value: "ALL", label: "Tous les types" },
  { value: "DEPOSIT", label: "Dépôt" },
  { value: "WITHDRAWAL", label: "Retrait" },
  { value: "TRANSFER", label: "Virement" },
  { value: "PAYMENT", label: "Paiement" },
];

export default function TransactionFilters({ filters, onChange }: TransactionFiltersProps) {
  const hasActiveFilters =
    filters.search || filters.type !== "ALL" || filters.dateFrom || filters.dateTo || filters.amountMax;

  const reset = () =>
    onChange({ search: "", type: "ALL", dateFrom: "", dateTo: "", amountMax: "" });

  return (
    <div className="rounded-xl border bg-background px-5 py-4 mb-6">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
          <label className="text-xs text-muted-foreground">Recherche</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              className="pl-8 h-9 text-sm"
              placeholder="Description, bénéficiaire…"
              value={filters.search}
              onChange={(e) => onChange({ ...filters, search: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 min-w-[160px]">
          <label className="text-xs text-muted-foreground">Type</label>
          <Select
            value={filters.type}
            onValueChange={(v) => onChange({ ...filters, type: v as TransactionType | "ALL" })}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground">Du</label>
          <Input
            type="date"
            className="h-9 text-sm w-[145px]"
            value={filters.dateFrom}
            onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground">Au</label>
          <Input
            type="date"
            className="h-9 text-sm w-[145px]"
            value={filters.dateTo}
            onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground">Montant max (€)</label>
          <Input
            type="number"
            className="h-9 text-sm w-[120px]"
            placeholder="ex: 500"
            value={filters.amountMax}
            onChange={(e) => onChange({ ...filters, amountMax: e.target.value })}
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-1.5 text-muted-foreground hover:text-foreground self-end"
            onClick={reset}
          >
            <X className="h-3.5 w-3.5" />
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  );
}