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
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type TransactionType = "virement" | "retrait" | "depot";

type Transaction = {
  id: number;
  label: string;
  date: string;
  type: TransactionType;
  montant: number;
};

const transactions: Transaction[] = [
  { id: 1, label: "Virement reçu — Jean Dupont", date: "17 mars 2026", type: "virement", montant: 500 },
  { id: 2, label: "Retrait DAB", date: "17 mars 2026", type: "retrait", montant: -45 },
  { id: 3, label: "Dépôt espèces", date: "15 mars 2026", type: "depot", montant: 200 },
  { id: 4, label: "Virement envoyé — Marie Martin", date: "14 mars 2026", type: "virement", montant: -150 },
  { id: 5, label: "Retrait DAB", date: "12 mars 2026", type: "retrait", montant: -60 },
];

const badgeVariant = {
  virement: "secondary",
  retrait: "secondary",
  depot: "secondary",
} as const;

export default function RecentTransactions() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="rounded-xl overflow-hidden border">
        <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b">
            <TableHead className="px-6 py-4 text-muted-foreground font-semibold border-b">Libellé</TableHead>
            <TableHead className="px-6 py-4 text-muted-foreground font-semibold border-b">Date</TableHead>
            <TableHead className="px-6 py-4 text-muted-foreground font-semibold border-b">Type</TableHead>
            <TableHead className="px-6 py-4 text-muted-foreground font-semibold border-b">Montant</TableHead>
          </TableRow>
        </TableHeader>
          <TableBody>
            {transactions.length ? (
              transactions.map((t, index) => (
                <TableRow
                  key={t.id}
                  className={`transition-all duration-200 hover:bg-accent border-b ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/10"
                  }`}
                >
                  <TableCell className="px-6 py-4 font-medium text-foreground">{t.label}</TableCell>
                  <TableCell className="px-6 py-4 text-sm text-muted-foreground">{t.date}</TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant={badgeVariant[t.type]} className="capitalize font-normal">
                      {t.type}
                    </Badge>
                  </TableCell>
                  <TableCell className={`px-6 py-4 text-xs ${t.montant > 0 ? "text-green-600" : "text-red-500"}`}>
                    {t.montant > 0 ? "+" : ""}
                    {t.montant.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Aucune transaction récente.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}