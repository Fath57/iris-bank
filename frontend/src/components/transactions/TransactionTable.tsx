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
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Transaction, TransactionType } from "@/types/Transaction";

interface TransactionsTableProps {
  transactions: Transaction[];
}

const typeConfig: Record<TransactionType, { label: string; className: string }> = {
  DEPOSIT: {
    label: "Dépôt",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/25",
  },
  WITHDRAWAL: {
    label: "Retrait",
    className: "bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-400 dark:border-red-500/25",
  },
  TRANSFER: {
    label: "Virement",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  PAYMENT: {
    label: "Paiement",
    className: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400 dark:border-amber-500/25",
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

/** Build a compact page range: [1, '…', 4, 5, 6, '…', 20] */
function getPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [];
  const addPage = (p: number) => {
    if (pages[pages.length - 1] !== p) pages.push(p);
  };
  const addEllipsis = () => {
    if (pages[pages.length - 1] !== "…") pages.push("…");
  };

  addPage(1);
  if (current > 3) addEllipsis();
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    addPage(i);
  }
  if (current < total - 2) addEllipsis();
  addPage(total);

  return pages;
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = transactions.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const pageRange = getPageRange(safePage, totalPages);

  return (
    <div className="animate-fade-up delay-200 rounded-xl border border-border/60 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="border-b border-border/60">
              <TableHead className="px-4 sm:px-6 py-3 text-muted-foreground font-semibold text-xs uppercase tracking-wider">Date</TableHead>
              <TableHead className="px-4 sm:px-6 py-3 text-muted-foreground font-semibold text-xs uppercase tracking-wider">Description</TableHead>
              <TableHead className="px-4 sm:px-6 py-3 text-muted-foreground font-semibold text-xs uppercase tracking-wider">Type</TableHead>
              <TableHead className="px-4 sm:px-6 py-3 text-muted-foreground font-semibold text-xs uppercase tracking-wider text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((t) => {
                const config = typeConfig[t.type];
                const label = t.description ?? (t.beneficiary ? t.beneficiary.name : "—");
                const isCredit = t.type === "DEPOSIT";
                return (
                  <TableRow
                    key={t.id}
                    className="transition-colors border-b border-border/40 hover:bg-muted/30"
                  >
                    <TableCell className="px-4 sm:px-6 py-3.5 text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(t.date)}
                    </TableCell>
                    <TableCell className="px-4 sm:px-6 py-3.5">
                      <div className="flex flex-col">
                        <span className="text-sm text-foreground">{label}</span>
                        {t.beneficiary && t.description && (
                          <span className="text-xs text-muted-foreground mt-0.5">
                            {t.beneficiary.name}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 sm:px-6 py-3.5">
                      <Badge
                        variant="outline"
                        className={cn("font-normal text-xs", config.className)}
                      >
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "px-4 sm:px-6 py-3.5 text-sm font-semibold text-right whitespace-nowrap tabular-nums",
                        isCredit
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500 dark:text-red-400"
                      )}
                    >
                      {isCredit ? "+" : ""}
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
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-border/60 bg-muted/20">
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
          {pageRange.map((p, i) =>
            p === "…" ? (
              <span key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center">
                <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
            ) : (
              <Button
                key={p}
                variant={p === safePage ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8 text-xs"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            )
          )}
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
