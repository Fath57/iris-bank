import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Transaction, TransactionType } from "@/types/Transaction";

interface TransactionsTableProps {
  transactions: Transaction[];
}

const typeConfig: Record<TransactionType, { label: string; className: string }> = {
  DEPOSIT: {
    label: "Dépôt",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  },
  WITHDRAWAL: {
    label: "Retrait",
    className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
  },
  TRANSFER: {
    label: "Virement",
    className: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  },
  PAYMENT: {
    label: "Paiement",
    className: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  },
};

const PAGE_SIZE = 10;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = transactions.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b">
            <TableHead className="px-6 py-3 text-muted-foreground font-semibold">Date</TableHead>
            <TableHead className="px-6 py-3 text-muted-foreground font-semibold">Description</TableHead>
            <TableHead className="px-6 py-3 text-muted-foreground font-semibold">Type</TableHead>
            <TableHead className="px-6 py-3 text-muted-foreground font-semibold text-right">Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length > 0 ? (
            paginated.map((t, index) => {
              const config = typeConfig[t.type];
              const label = t.description ?? (t.beneficiary ? t.beneficiary.name : "—");
              return (
                <TableRow
                  key={t.id}
                  className={`transition-colors border-b hover:bg-accent ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  }`}
                >
                  <TableCell className="px-6 py-3.5 text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(t.date)}
                  </TableCell>
                  <TableCell className="px-6 py-3.5">
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground">{label}</span>
                      {t.beneficiary && t.description && (
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {t.beneficiary.name}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-3.5">
                    <Badge
                      variant="outline"
                      className={`font-normal text-xs border ${config.className}`}
                    >
                      {config.label}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`px-6 py-3.5 text-sm font-semibold text-right whitespace-nowrap ${
                      t.amount >= 0 ? "text-emerald-600" : "text-foreground"
                    }`}
                  >
                    {t.amount >= 0 ? "+" : ""}
                    {t.amount.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    €
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-muted-foreground text-sm">
                Aucune transaction ne correspond aux filtres sélectionnés.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-6 py-3 border-t bg-muted/30">
        <p className="text-xs text-muted-foreground">
          {transactions.length > 0
            ? `${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(
                safePage * PAGE_SIZE,
                transactions.length
              )} sur ${transactions.length} transaction${transactions.length > 1 ? "s" : ""}`
            : "Aucune transaction"}
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={p === safePage ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 text-xs"
              onClick={() => setPage(p)}
            >
              {p}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}