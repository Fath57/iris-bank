import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, PiggyBank, CreditCard, ArrowDownUp, Loader2 } from "lucide-react";
import { useAccountStats } from "@/hooks/useDashboard";
import { formatAmount, formatDateLong } from "@/lib/format";
import { cn } from "@/lib/utils";

const cards = [
  {
    key: "total",
    title: "Solde total",
    sub: "Tous comptes confondus",
    icon: Wallet,
    iconClass: "bg-primary/10 text-primary",
  },
  {
    key: "checking",
    title: "Compte courant",
    sub: "Compte principal",
    icon: CreditCard,
    iconClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    key: "savings",
    title: "Épargne",
    sub: "Total livrets & épargne",
    icon: PiggyBank,
    iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "last",
    title: "Dernière opération",
    sub: "",
    icon: ArrowDownUp,
    iconClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
] as const;

export default function StatsCards() {
  const { data, isLoading, isError } = useAccountStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="flex h-24 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-center text-sm text-destructive">
        Impossible de charger les indicateurs.
      </div>
    );
  }

  const { totalBalance, checkingBalance, savingsBalance, lastTransaction } = data;

  const values: Record<string, { amount: string; sub: string; amountClass?: string }> = {
    total: { amount: `${formatAmount(totalBalance)}`, sub: "Tous comptes confondus" },
    checking: { amount: `${formatAmount(checkingBalance)}`, sub: "Compte principal" },
    savings: { amount: `${formatAmount(savingsBalance)}`, sub: "Total livrets & épargne" },
    last: lastTransaction
      ? {
          amount: `${lastTransaction.type === "DEPOSIT" ? "+" : "−"}${formatAmount(lastTransaction.amount)}`,
          sub: `${lastTransaction.description ?? lastTransaction.type} — ${formatDateLong(lastTransaction.date)}`,
          amountClass: lastTransaction.type === "DEPOSIT"
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-500 dark:text-red-400",
        }
      : { amount: "—", sub: "Aucune opération" },
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => {
        const v = values[card.key];
        return (
          <Card
            key={card.key}
            className={`animate-fade-up shadow-sm delay-${(i + 1) * 100}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-foreground">{card.title}</CardTitle>
              <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", card.iconClass)}>
                <card.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold pb-1 tabular-nums", v.amountClass)}>
                {v.amount}
              </div>
              <p className="text-xs text-muted-foreground truncate">{v.sub}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
