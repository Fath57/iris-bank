import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { cn } from "@/lib/utils";

export type Op = "DEPOSIT" | "WITHDRAWAL";

interface OperationSelectorProps {
  operation: Op;
  onChange: (op: Op) => void;
}

const OPTIONS: { op: Op; label: string; desc: string }[] = [
  { op: "DEPOSIT",    label: "Dépôt",   desc: "Ajouter des fonds"   },
  { op: "WITHDRAWAL", label: "Retrait", desc: "Retirer des fonds"   },
];

export function OperationSelector({ operation, onChange }: OperationSelectorProps) {
  return (
    <div className="animate-fade-up delay-100">
      <p className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium mb-3">
        Type d'opération
      </p>
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map(({ op, label, desc }) => {
          const active = operation === op;
          const isDeposit = op === "DEPOSIT";
          return (
            <button
              key={op}
              onClick={() => onChange(op)}
              className={cn(
                "flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-200",
                active && isDeposit  && "border-emerald-500/30 bg-emerald-500/10 dark:border-emerald-500/25 dark:bg-emerald-500/10",
                active && !isDeposit && "border-red-500/30 bg-red-500/10 dark:border-red-500/25 dark:bg-red-500/10",
                !active && "border-border bg-card hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-colors",
                active && isDeposit  && "bg-emerald-500/15 dark:bg-emerald-500/20",
                active && !isDeposit && "bg-red-500/15 dark:bg-red-500/20",
                !active && "bg-muted"
              )}>
                {isDeposit
                  ? <ArrowDownToLine className={cn("h-4 w-4", active ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground")} />
                  : <ArrowUpFromLine className={cn("h-4 w-4", active ? "text-red-600 dark:text-red-400"         : "text-muted-foreground")} />
                }
              </div>
              <div>
                <p className={cn(
                  "text-sm font-semibold",
                  active && isDeposit  && "text-emerald-700 dark:text-emerald-300",
                  active && !isDeposit && "text-red-700 dark:text-red-300",
                  !active && "text-foreground"
                )}>
                  {label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
