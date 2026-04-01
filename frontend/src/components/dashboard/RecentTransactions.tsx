import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useRecentTransactions } from "@/hooks/useDashboard";
import { formatAmount, formatDateLong } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { RecentTransaction } from "@/types/Dashboard";

const typeConfig: Record<RecentTransaction["type"], { label: string; className: string }> = {
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

export default function RecentTransactions() {
  const { data: transactions, isLoading, isError } = useRecentTransactions(5);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !transactions) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-center text-sm text-destructive">
        Impossible de charger les transactions.
      </div>
    );
  }

  return (
    <div className="animate-fade-up delay-300 rounded-xl overflow-hidden border border-border/60 shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="border-b border-border/60">
              <TableHead className="px-4 sm:px-6 py-3 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                Libellé
              </TableHead>
              <TableHead className="px-4 sm:px-6 py-3 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                Date
              </TableHead>
              <TableHead className="px-4 sm:px-6 py-3 text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                Type
              </TableHead>
              <TableHead className="px-4 sm:px-6 py-3 text-muted-foreground font-semibold text-xs uppercase tracking-wider text-right">
                Montant
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground text-sm"
                >
                  Aucune transaction récente.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => {
                const config = typeConfig[tx.type];
                const isCredit = tx.type === "DEPOSIT";
                return (
                  <TableRow
                    key={tx.id}
                    className="transition-colors border-b border-border/40 hover:bg-muted/30"
                  >
                    <TableCell className="px-4 sm:px-6 py-3.5 font-medium text-sm text-foreground">
                      {tx.description ?? config.label}
                    </TableCell>
                    <TableCell className="px-4 sm:px-6 py-3.5 text-sm text-muted-foreground whitespace-nowrap">
                      {formatDateLong(tx.date)}
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
                      {isCredit ? "+" : "−"}
                      {formatAmount(tx.amount)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
