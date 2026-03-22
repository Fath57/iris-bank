import { useNavigate } from "react-router-dom";
import { ArrowRight, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatAmount, formatAmountSigned } from "@/lib/format";

const ACCOUNT_DETAILS = {
  CHECKING: { name: "Compte Courant", subtype: "Compte principal", label: "Courant", className: "bg-blue-50 text-blue-700 border-blue-200" },
  SAVINGS: { name: "Livret d'Épargne", subtype: "Épargne", label: "Épargne", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  BUSINESS: { name: "Compte Pro", subtype: "Entreprise", label: "Pro", className: "bg-violet-50 text-violet-700 border-violet-200" },
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(date);
};

export function AccountCard({ account }: { account: any }) {
  const navigate = useNavigate();
  const balance = Number(account.balance);
  const isOverdraft = balance < 0;
  
  const details = ACCOUNT_DETAILS[account.type as keyof typeof ACCOUNT_DETAILS] || ACCOUNT_DETAILS.CHECKING;

  return (
    <Card
      onClick={() => navigate(`/comptes/${account.id}`)}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border flex flex-col",
        isOverdraft ? "border-red-200 bg-red-50/20" : "border-border hover:border-border/80"
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between ">
        <div className="space-y-0.5">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground/60 font-medium">
            {details.subtype}
          </p>
          <p className="font-semibold text-sm leading-tight">{details.name}</p>
          <p className="font-mono text-[10px] text-muted-foreground/40 tracking-wide pt-0.5">
            {account.iban}
          </p>
        </div>
        <Badge
          variant="outline"
          className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0", details.className)}
        >
          {details.label}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-0 mt-[-10px]">
        <div className="space-y-0.5">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground/60 font-medium">
            Solde disponible
          </p>
          <p
            className={cn(
              "text-2xl font-bold tracking-tight tabular-nums",
              isOverdraft ? "text-red-600" : "text-foreground"
            )}
          >
            {formatAmount(balance)}
          </p>
        </div>

        {isOverdraft && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-xs text-red-600 font-medium">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            Découvert autorisé utilisé
          </div>
        )}

        <Separator className="opacity-50" />

        <div className="space-y-2">
          {account.transactions?.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-2">Aucune transaction récente</p>
          ) : (
            account.transactions?.map((txn: any) => {
              const amount = Number(txn.amount);

              const isPositive = amount >= 0 && txn.type !== "WITHDRAWAL" && txn.type !== "PAYMENT";
              const displayAmount = isPositive ? amount : -Math.abs(amount); 

              return (
                <div key={txn.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {isPositive
                      ? <TrendingUp className="h-3 w-3 shrink-0 text-emerald-500" />
                      : <TrendingDown className="h-3 w-3 shrink-0 text-red-400" />
                    }
                    <div className="min-w-0">
                      <p className="text-xs text-foreground/80 truncate leading-tight">
                        {txn.description || txn.type}
                      </p>
                      <p className="text-[10px] text-muted-foreground/50 leading-tight">
                        {formatDate(txn.date)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold tabular-nums shrink-0",
                      isPositive ? "text-emerald-600" : "text-red-500"
                    )}
                  >
                    {formatAmountSigned(displayAmount)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </CardContent>

      <CardFooter className="pb-3 mt-auto">
        <Button size="lg" className="w-full text-xs font-medium gap-1.5" tabIndex={-1}>
          Voir le compte
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}