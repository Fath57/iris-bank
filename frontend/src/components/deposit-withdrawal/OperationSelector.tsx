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
    <div>
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
                "flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all",
                active && isDeposit  && "border-emerald-300 bg-emerald-50",
                active && !isDeposit && "border-red-300 bg-red-50",
                !active && "border-border bg-muted/30 hover:bg-muted/60"
              )}
            >
              <div className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center shrink-0",
                active && isDeposit  && "bg-emerald-100",
                active && !isDeposit && "bg-red-100",
                !active && "bg-muted"
              )}>
                {isDeposit
                  ? <ArrowDownToLine className={cn("h-4 w-4", active ? "text-emerald-700" : "text-muted-foreground")} />
                  : <ArrowUpFromLine className={cn("h-4 w-4", active ? "text-red-600"     : "text-muted-foreground")} />
                }
              </div>
              <div>
                <p className={cn(
                  "text-sm font-semibold",
                  active && isDeposit  && "text-emerald-800",
                  active && !isDeposit && "text-red-700",
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