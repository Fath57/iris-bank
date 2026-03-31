import { useParams, useNavigate } from "react-router-dom";
import { useAccountTransactions } from "@/hooks/useAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, TrendingUp, TrendingDown, Activity, CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminAccountTransactionsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useAccountTransactions(id!);

  const accountData = data?.account;
  const transactions = data?.transactions || [];
  const [typeFilter, setTypeFilter] = useState<string>("all");

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!accountData) {
    return (
      <div className="p-6">
        <p>Compte non trouvé</p>
      </div>
    );
  }

  const filteredTransactions =
    typeFilter === "all"
      ? transactions
      : transactions.filter((t) => t.type === typeFilter);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "WITHDRAWAL":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "TRANSFER":
        return <Activity className="h-4 w-4 text-blue-500" />;
      case "PAYMENT":
        return <CreditCard className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return "Dépôt";
      case "WITHDRAWAL":
        return "Retrait";
      case "TRANSFER":
        return "Virement";
      case "PAYMENT":
        return "Paiement";
      default:
        return type;
    }
  };

  const getTransactionVariant = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return "default";
      case "WITHDRAWAL":
        return "destructive";
      case "TRANSFER":
        return "secondary";
      case "PAYMENT":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Historique des Transactions</h1>
          <p className="text-muted-foreground font-mono">{accountData.iban}</p>
        </div>
      </div>

      {/* Informations du compte */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Propriétaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {accountData.user.firstName} {accountData.user.lastName}
            </div>
            <p className="text-xs text-muted-foreground">
              {accountData.user.email}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solde</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Number(accountData.balance).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {accountData.type === "CHECKING" && "Compte Courant"}
              {accountData.type === "SAVINGS" && "Compte Épargne"}
              {accountData.type === "BUSINESS" && "Compte Professionnel"}
              {accountData.type === "LIVRET_A" && "Livret A"}
              {accountData.type === "PEL" && "PEL (Plan Épargne Logement)"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Statut</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              {accountData.status === "ACTIVE" && (
                <Badge variant="default" className="bg-green-500">
                  Actif
                </Badge>
              )}
              {accountData.status === "BLOCKED" && (
                <Badge variant="destructive">Bloqué</Badge>
              )}
              {accountData.status === "CLOSED" && (
                <Badge variant="secondary">Fermé</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {data?.total || 0} transaction(s)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Transactions ({filteredTransactions.length})
            </CardTitle>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="DEPOSIT">Dépôts</SelectItem>
                <SelectItem value="WITHDRAWAL">Retraits</SelectItem>
                <SelectItem value="TRANSFER">Virements</SelectItem>
                <SelectItem value="PAYMENT">Paiements</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                Aucune transaction
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {typeFilter === "all"
                  ? "Aucune transaction enregistrée pour ce compte"
                  : "Aucune transaction de ce type"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTransactionVariant(transaction.type)}>
                        <span className="flex items-center gap-1">
                          {getTransactionIcon(transaction.type)}
                          {getTransactionTypeLabel(transaction.type)}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {transaction.description}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      <span
                        className={
                          transaction.type === "DEPOSIT"
                            ? "text-green-600"
                            : transaction.type === "WITHDRAWAL"
                            ? "text-red-600"
                            : ""
                        }
                      >
                        {transaction.type === "DEPOSIT" ? "+" : "-"}
                        {Number(transaction.amount).toLocaleString("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
