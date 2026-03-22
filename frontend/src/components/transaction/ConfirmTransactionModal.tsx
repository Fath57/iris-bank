import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatAmount } from "@/lib/format";
import type { TransactionFormValues } from "@/types/TransactionForm";

function maskIban(iban: string) {
  const clean = iban.replace(/\s/g, "");
  return `${clean.slice(0, 4)} ···· ${clean.slice(-7)}`;
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={mono
        ? "text-xs font-mono text-foreground tracking-wide"
        : "text-xs font-medium text-foreground"
      }>
        {value}
      </span>
    </div>
  );
}

interface ConfirmTransactionModalProps {
  values: TransactionFormValues;
  onConfirm: () => void;
  onClose: () => void;
  isPending: boolean;
}

export function ConfirmTransactionModal({ values, onConfirm, onClose, isPending }: ConfirmTransactionModalProps) {
  const executionDate = new Date();
  executionDate.setDate(executionDate.getDate() + 1);
  const dateLabel = executionDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md bg-background rounded-xl border border-border">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
          <p className="text-sm font-medium">Récapitulatif du virement</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Amount — hero */}
        <div className="px-5 pt-5 pb-6 text-center">
          <p className="text-3xl font-semibold tabular-nums">{formatAmount(values.amount)}</p>
          <div className="flex items-center justify-center gap-2 mt-1.5 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{values.fromAccountName}</span>
            <ArrowRight className="h-3 w-3 shrink-0" />
            <span className="font-medium text-foreground">{values.toBeneficiaryName}</span>
          </div>
        </div>

        <Separator className="opacity-50 mx-5 w-auto" />

        {/* Details */}
        <div className="mx-5 rounded-xl bg-muted/40 border border-border/60 px-4 divide-y divide-border/50">
          <Row label="Compte débiteur" value={maskIban(values.fromAccountIban)} mono />
          <Row label="Bénéficiaire" value={maskIban(values.toBeneficiaryIban)} mono />
          {values.motif && <Row label="Motif" value={values.motif} />}
          <Row label="Date d'exécution estimée" value={dateLabel} />
        </div>

        {/* Actions */}
        <div className="flex gap-4 px-5 py-8">
          <Button variant="outline" size="lg" className="flex-1 text-xs" onClick={onClose}>
            Modifier
          </Button>
          <Button size="lg" className="flex-1 text-xs" onClick={onConfirm} disabled={isPending}>
            Valider le virement
          </Button>
        </div>

      </div>
    </div>
  );
}