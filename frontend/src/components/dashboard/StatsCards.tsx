import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, PiggyBank, CreditCard, ArrowDownUp, Loader2 } from "lucide-react";
import { useAccountStats } from "@/hooks/useDashboard";

const formatAmount = (amount: number) =>
  amount.toLocaleString("fr-FR", { minimumFractionDigits: 2 });

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function StatsCards() {
  const { data, isLoading, isError } = useAccountStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
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
      <div className="rounded-xl border border-destructive p-4 text-center text-sm text-destructive">
        Impossible de charger les indicateurs.
      </div>
    );
  }

  const { totalBalance, checkingBalance, savingsBalance, lastTransaction } = data;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Solde total</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold pb-1">{formatAmount(totalBalance)} €</div>
          <p className="text-xs text-muted-foreground">Tous comptes confondus</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Compte courant</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold pb-1">{formatAmount(checkingBalance)} €</div>
          <p className="text-xs text-muted-foreground">Compte principal</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Épargne</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold pb-1">{formatAmount(savingsBalance)} €</div>
          <p className="text-xs text-muted-foreground">Total livrets & épargne</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Dernière opération</CardTitle>
          <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {lastTransaction ? (
            <>
              <div
                className={`text-2xl font-bold pb-1 ${
                  lastTransaction.type === "DEPOSIT" ? "text-green-600" : "text-red-500"
                }`}
              >
                {lastTransaction.type === "DEPOSIT" ? "+" : "-"}
                {formatAmount(lastTransaction.amount)} €
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {lastTransaction.description ?? lastTransaction.type} —{" "}
                {formatDate(lastTransaction.date)}
              </p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">Aucune opération</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}