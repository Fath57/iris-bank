import { ArrowDownToLine, ArrowUpFromLine, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatAmount } from "@/lib/format";
import { ACCOUNT_META } from "@/lib/accountMeta";
import type { Account, Op } from "@/types/Banking";

interface OperationSummaryProps {
  operation: Op;
  selectedAccount: Account;
  parsed: number | null;
  isValid: boolean;
  isOverdraft: boolean;
  motif: string;
  isPending: boolean;
  onSubmit: () => void;
}

export function OperationSummary({
  operation, selectedAccount, parsed, isValid, isOverdraft, motif, isPending, onSubmit,
}: OperationSummaryProps) {
  const meta = ACCOUNT_META[selectedAccount.type] ?? ACCOUNT_META.CHECKING;
  const balance = Number(selectedAccount.balance);
  const isDeposit = operation === "DEPOSIT";

  return (
    <Card className="overflow-hidden">
      <div className={cn(
        "px-5 py-4 border-b",
        isDeposit ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"
      )}>
        <p className={cn(
          "text-xs font-medium uppercase tracking-widest",
          isDeposit ? "text-emerald-600" : "text-red-500"
        )}>
          Récapitulatif
        </p>
      </div>

      <CardContent className="pt-5 space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Opération</span>
            <span className={cn("font-semibold", isDeposit ? "text-emerald-700" : "text-red-600")}>
              {isDeposit ? "Dépôt" : "Retrait"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Compte</span>
            <span className="font-medium">{meta.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Solde actuel</span>
            <span className="font-medium tabular-nums">{formatAmount(balance)}</span>
          </div>

          {isValid && parsed !== null && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant</span>
                <span className={cn("font-semibold tabular-nums", isDeposit ? "text-emerald-700" : "text-red-600")}>
                  {isDeposit ? "+" : "−"}{formatAmount(parsed)}
                </span>
              </div>
              <Separator className="opacity-40" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Solde après opération</span>
                <span className={cn(
                  "font-bold text-base tabular-nums",
                  isOverdraft ? "text-red-600" : "text-foreground"
                )}>
                  {formatAmount(isDeposit ? balance + parsed : balance - parsed)}
                </span>
              </div>
            </>
          )}
        </div>

        {motif && (
          <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground italic">
            "{motif}"
          </div>
        )}

        <Button
          size="lg"
          className={cn(
            "w-full font-medium gap-2 mt-2",
            !isDeposit && !isOverdraft && "bg-red-600 hover:bg-red-700"
          )}
          onClick={onSubmit}
          disabled={isPending || isOverdraft || !isValid}
        >
          {isPending ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Traitement…</>
          ) : isDeposit ? (
            <><ArrowDownToLine className="h-4 w-4" /> Confirmer le dépôt</>
          ) : (
            <><ArrowUpFromLine className="h-4 w-4" /> Confirmer le retrait</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}