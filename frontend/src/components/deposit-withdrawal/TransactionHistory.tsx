import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatAmount, formatDate } from "@/lib/format";
import type { Transaction } from "@/types/Banking";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Dernières opérations</CardTitle>
          <button className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            Tout voir <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {transactions.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">Aucune opération récente.</p>
        ) : (
          transactions.map((tx, i) => {
            const isDeposit = tx.type === "DEPOSIT";
            return (
              <div key={tx.id}>
                <div className="flex items-center gap-3 py-3">
                  <div className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center shrink-0",
                    isDeposit ? "bg-emerald-50" : "bg-red-50"
                  )}>
                    {isDeposit
                      ? <TrendingUp className="h-3 w-3 text-emerald-600" />
                      : <TrendingDown className="h-3 w-3 text-red-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{tx.description ?? tx.type}</p>
                    <p className="text-[10px] text-muted-foreground">{formatDate(tx.date)}</p>
                  </div>
                  <span className={cn(
                    "text-xs font-semibold tabular-nums shrink-0",
                    isDeposit ? "text-emerald-600" : "text-red-500"
                  )}>
                    {isDeposit ? "+" : "−"}{formatAmount(Number(tx.amount))}
                  </span>
                </div>
                {i < transactions.length - 1 && <Separator className="opacity-30" />}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}