import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const QUICK_AMOUNTS = [20, 50, 100, 200, 500];

interface AmountFormProps {
  amount: string;
  motif: string;
  error: string;
  isOverdraft: boolean;
  onAmountChange: (val: string) => void;
  onMotifChange: (val: string) => void;
}

export function AmountForm({
  amount,
  motif,
  error,
  isOverdraft,
  onAmountChange,
  onMotifChange,
}: AmountFormProps) {
  const numericAmount = parseFloat(amount.replace(",", "."));

  return (
    <>
      <Card className="animate-fade-up delay-200 shadow-sm">
        <CardContent className="pt-5 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="amount">Montant</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xl font-light select-none">
                €
              </span>
              <Input
                id="amount"
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^[0-9]*[.,]?[0-9]{0,2}$/.test(val)) {
                    onAmountChange(val);
                  }
                }}
                className="pl-10 text-2xl font-bold h-14 tracking-tight tabular-nums"
              />
            </div>
            <div className="flex gap-2 pt-1 flex-wrap">
              {QUICK_AMOUNTS.map((q) => (
                <button
                  key={q}
                  onClick={() => onAmountChange(String(q))}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150",
                    numericAmount === q
                      ? "border-primary/40 bg-primary/10 text-primary dark:bg-primary/15"
                      : "border-border bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {q} €
                </button>
              ))}
            </div>
          </div>

          <Separator className="opacity-40" />

          <div className="space-y-2">
            <Label htmlFor="motif">
              Motif{" "}
              <span className="text-muted-foreground font-normal text-xs">(optionnel)</span>
            </Label>
            <Input
              id="motif"
              placeholder="Ex : Dépôt salaire, retrait vacances…"
              value={motif}
              onChange={(e) => onMotifChange(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {(error || isOverdraft) && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400 font-medium animate-fade-up">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error || "Solde insuffisant pour effectuer ce retrait."}
        </div>
      )}
    </>
  );
}
