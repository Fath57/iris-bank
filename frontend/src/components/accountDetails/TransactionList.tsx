import { useState, useMemo } from "react";
import type { Transaction } from "@/data/accountDetails";
import { TransactionRow } from "./TransactionRow";
import { formatAmountSigned } from "@/lib/format";
import { groupByMonth } from "@/lib/transaction";
import { FILTERS, type Filter } from "@/config/account.config";
import { Search, FileDown, ChevronRight } from "lucide-react"; 

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchType = activeFilter === "ALL" || tx.type === activeFilter;
      const matchSearch = !search || tx.description.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [transactions, activeFilter, search]);

  const grouped = useMemo(() => groupByMonth(filtered), [filtered]);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      {/* Header compact & Pro */}
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold tracking-tight text-base">Historique</h2>
          <button className="inline-flex items-center gap-2 text-xs font-medium hover:bg-accent px-2 py-1 rounded-md transition-colors">
            <FileDown className="h-3.5 w-3.5" /> Exporter
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-muted/50 border-none rounded-md focus:ring-1 focus:ring-primary/20 outline-none"
            />
          </div>
          
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  activeFilter === f.value 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="divide-y">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            Aucun résultat pour cette recherche.
          </div>
        ) : (
          grouped.map(([month, txs]) => (
            <div key={month} className="group">
              <div className="flex items-center justify-between px-4 py-2 bg-muted/30 sticky top-0 backdrop-blur-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {month}
                </span>
                <span className="text-[10px] font-medium tabular-nums text-muted-foreground">
                  {formatAmountSigned(txs.reduce((s, t) => s + t.amount, 0))}
                </span>
              </div>
              <ul className="divide-y divide-border/40">
                {txs.map((tx, i) => (
                  <TransactionRow 
                    key={tx.id} 
                    transaction={tx} 
                    isLast={i === txs.length - 1} 
                  />
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <button className="w-full py-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex items-center justify-center gap-1 border-t">
        Voir plus de transactions <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
}