import { useAdminStats } from "@/hooks/useAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  CreditCard,
  TrendingUp,
  Activity,
  ShieldAlert,
  DollarSign,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const { data: stats, isLoading, error } = useAdminStats();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard Administrateur</h1>
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">
              Erreur lors du chargement des statistiques
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalBalance =
    typeof stats?.balance.total === "string"
      ? parseFloat(stats.balance.total)
      : stats?.balance.total || 0;

  const depositSum =
    stats?.transactions.byType.find((t) => t.type === "DEPOSIT")?._sum
      .amount || 0;
  const withdrawalSum =
    stats?.transactions.byType.find((t) => t.type === "WITHDRAWAL")?._sum
      .amount || 0;
  const transferSum =
    stats?.transactions.byType.find((t) => t.type === "TRANSFER")?._sum
      .amount || 0;
  const paymentSum =
    stats?.transactions.byType.find((t) => t.type === "PAYMENT")?._sum
      .amount || 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de la plateforme IRIS Bank
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clients Totaux
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.clients.total}</div>
            <p className="text-xs text-muted-foreground">
              +{stats?.clients.recent} ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Comptes Bancaires
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.accounts.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.accounts.blocked} compte(s) bloqué(s)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solde Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalBalance.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Tous comptes confondus
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transactions
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.transactions.total}
            </div>
            <p className="text-xs text-muted-foreground">Total effectuées</p>
          </CardContent>
        </Card>
      </div>

      {/* Détails des comptes */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Comptes par Statut</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.accounts.byStatus.map((statusGroup) => (
              <div
                key={statusGroup.status}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  {statusGroup.status === "ACTIVE" && (
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  )}
                  {statusGroup.status === "BLOCKED" && (
                    <ShieldAlert className="h-4 w-4 text-destructive" />
                  )}
                  {statusGroup.status === "CLOSED" && (
                    <div className="h-3 w-3 rounded-full bg-gray-400" />
                  )}
                  <span className="font-medium">
                    {statusGroup.status === "ACTIVE" && "Actifs"}
                    {statusGroup.status === "BLOCKED" && "Bloqués"}
                    {statusGroup.status === "CLOSED" && "Fermés"}
                  </span>
                </div>
                <span className="text-2xl font-bold">
                  {statusGroup._count.id}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Détails des transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Volume des Transactions par Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-medium">Dépôts</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {depositSum.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {
                    stats?.transactions.byType.find((t) => t.type === "DEPOSIT")
                      ?._count.id
                  }{" "}
                  transactions
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                <span className="font-medium">Retraits</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {withdrawalSum.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {
                    stats?.transactions.byType.find(
                      (t) => t.type === "WITHDRAWAL"
                    )?._count.id
                  }{" "}
                  transactions
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Virements</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {transferSum.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {
                    stats?.transactions.byType.find(
                      (t) => t.type === "TRANSFER"
                    )?._count.id
                  }{" "}
                  transactions
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Paiements</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {paymentSum.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {
                    stats?.transactions.byType.find((t) => t.type === "PAYMENT")
                      ?._count.id
                  }{" "}
                  transactions
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
