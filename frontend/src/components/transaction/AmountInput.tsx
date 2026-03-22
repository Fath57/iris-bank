import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { formatAmount } from "@/lib/format";
import { QUICK_AMOUNTS } from "@/data/constant";

interface AmountInputProps {
  amount: number;
  motif: string;
  maxAmount: number;
  onAmountChange: (amount: number) => void;
  onMotifChange: (motif: string) => void;
}

export function AmountInput({ amount, motif, maxAmount, onAmountChange, onMotifChange }: AmountInputProps) {
  const [raw, setRaw] = useState(amount > 0 ? String(amount) : "");
  const balanceAfter = maxAmount - amount;

  const setAmount = (val: number) => {
    setRaw(String(val));
    onAmountChange(val);
  };

  const handleChange = (str: string) => {
    setRaw(str);
    const parsed = parseFloat(str.replace(",", "."));
    onAmountChange(isNaN(parsed) ? 0 : parsed);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 bg-muted/30 border border-border/50 rounded-lg px-3 py-2.5">
          <span className="text-sm text-muted-foreground shrink-0">EUR €</span>
          <Input
            type="number"
            min={0}
            step={0.01}
            placeholder="0,00"
            value={raw}
            onChange={(e) => handleChange(e.target.value)}
            className="border-0 bg-transparent text-lg font-semibold tabular-nums focus-visible:ring-0 p-0 h-auto min-w-0"
          />
        </div>

        {amount > 0 && (
          <p className={cn("text-xs", balanceAfter < 0 ? "text-red-500" : "text-muted-foreground")}>
            Solde après transaction : {formatAmount(balanceAfter)}
            {balanceAfter < 0 && " · Découvert"}
          </p>
        )}

        <div className="flex gap-2 flex-wrap">
          {QUICK_AMOUNTS.map((n) => (
            <Button key={n} variant="outline" size="sm" className="text-xs h-7 rounded-full" onClick={() => setAmount(amount + n)}>
              +{n} €
            </Button>
          ))}
          <Button variant="outline" size="sm" className="text-xs h-7 rounded-full" onClick={() => setAmount(maxAmount)}>
            Tout
          </Button>
        </div>
      </div>

      <Separator className="opacity-50" />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Motif <span className="text-muted-foreground/40">(optionnel)</span>
          </p>
          <span className="text-[10px] text-muted-foreground/40">{motif.length} / 140</span>
        </div>
        <Textarea
          placeholder="Remboursement, loyer, cadeau…"
          maxLength={140}
          rows={2}
          value={motif}
          onChange={(e) => onMotifChange(e.target.value)}
          className="text-xs resize-none"
        />
      </div>
    </div>
  );
}