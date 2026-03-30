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
import type { RecentTransaction } from "@/types/Dashboard";

// Libellés FR pour les types de transaction
const typeLabel: Record<RecentTransaction["type"], string> = {
  DEPOSIT: "Dépôt",
  WITHDRAWAL: "Retrait",
  TRANSFER: "Virement",
  PAYMENT: "Paiement",
};

const formatAmount = (amount: number) =>
  amount.toLocaleString("fr-FR", { minimumFractionDigits: 2 });

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const isCredit = (tx: RecentTransaction) => tx.type === "DEPOSIT";

export default function RecentTransactions() {
  const { data: transactions, isLoading, isError } = useRecentTransactions(5);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !transactions) {
    return (
      <div className="rounded-xl border border-destructive p-4 text-center text-sm text-destructive">
        Impossible de charger les transactions.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-xl overflow-hidden border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-b">
              <TableHead className="px-6 py-4 text-muted-foreground font-semibold border-b">
                Libellé
              </TableHead>
              <TableHead className="px-6 py-4 text-muted-foreground font-semibold border-b">
                Date
              </TableHead>
              <TableHead className="px-6 py-4 text-muted-foreground font-semibold border-b">
                Type
              </TableHead>
              <TableHead className="px-6 py-4 text-muted-foreground font-semibold border-b">
                Montant
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  Aucune transaction récente.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx, index) => (
                <TableRow
                  key={tx.id}
                  className={`transition-all duration-200 hover:bg-accent border-b ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  }`}
                >
                  <TableCell className="px-6 py-4 font-medium text-foreground">
                    {tx.description ?? typeLabel[tx.type]}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDate(tx.date)}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="secondary" className="capitalize font-normal">
                      {typeLabel[tx.type]}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`px-6 py-4 text-xs font-medium ${
                      isCredit(tx) ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {isCredit(tx) ? "+" : "-"}
                    {formatAmount(tx.amount)} €
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}