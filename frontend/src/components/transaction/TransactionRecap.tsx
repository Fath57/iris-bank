import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatAmount } from "@/lib/format";
import type { TransactionFormValues } from "@/types/TransactionForm";

interface TransactionRecapProps {
  values: TransactionFormValues;
  onSubmit: () => void;
  isPending: boolean;
}

export function TransactionRecap({ values, onSubmit, isPending }: TransactionRecapProps) {
  const hasAmount = values.amount > 0;
  const hasBeneficiary = !!values.toBeneficiaryName;

  const rows: { label: string; value: React.ReactNode; sub?: string }[] = [
    { label: "De", value: values.fromAccountName, sub: values.fromAccountIban },
    {
      label: "Vers",
      value: hasBeneficiary ? values.toBeneficiaryName : <span className="text-muted-foreground/40 italic">—</span>,
      sub: hasBeneficiary ? values.toBeneficiaryIban : undefined,
    },
    {
      label: "Motif",
      value: values.motif || <span className="text-muted-foreground/40 italic">Non renseigné</span>,
    },
    { label: "Frais", value: <span className="text-emerald-600 font-medium">Gratuit</span> },
  ];

  return (
    <Card className="sticky top-6 border flex flex-col">
      <CardHeader className="pb-0">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground/60 font-medium">
          Récapitulatif
        </p>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="text-center py-3 border rounded-lg bg-muted/30">
          <p className="text-3xl font-semibold tracking-tight tabular-nums">
            {hasAmount ? formatAmount(values.amount) : <span className="text-muted-foreground/30">— €</span>}
          </p>
        </div>

        <Separator className="opacity-50" />

        <div className="space-y-0">
          {rows.map(({ label, value, sub }) => (
            <div key={label} className="flex justify-between items-start py-2 border-b border-border/40 last:border-0 gap-4">
              <span className="text-xs text-muted-foreground shrink-0">{label}</span>
              <div className="text-right">
                <p className="text-xs font-medium text-foreground leading-tight">{value}</p>
                {sub && <p className="text-[10px] text-muted-foreground/50 font-mono mt-0.5">{sub}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 mt-auto pt-0">
        <Button
          className="w-full"
          size="lg"
          onClick={onSubmit}
          disabled={!hasAmount || !hasBeneficiary || isPending}
        >
          Vérifier la transaction
        </Button>

        <div className="flex flex-col items-center gap-1.5">
          <Badge variant="outline" className="text-[10px] text-muted-foreground/60 font-normal">
            SEPA · 1 jour ouvré
          </Badge>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground/50">
            <ShieldCheck className="h-3 w-3" />
            Authentification forte requise
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}