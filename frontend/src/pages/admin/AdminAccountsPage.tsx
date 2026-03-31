import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllAccounts } from "@/hooks/useAdmin";
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
import { Eye, CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminAccountsPage() {
  const navigate = useNavigate();
  const { data: accountsData, isLoading } = useAllAccounts();

  const accounts = accountsData?.accounts || [];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Gestion des Comptes</h1>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Comptes</h1>
          <p className="text-muted-foreground">
            {accountsData?.total || 0} compte(s) au total
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Liste des Comptes Bancaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          {accounts.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Aucun compte</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Aucun compte bancaire enregistré pour le moment
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IBAN</TableHead>
                  <TableHead>Propriétaire</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Solde</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-mono text-sm">
                      {account.iban}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {account.user.firstName} {account.user.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {account.user.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {account.type === "CHECKING" && "Courant"}
                        {account.type === "SAVINGS" && "Épargne"}
                        {account.type === "BUSINESS" && "Professionnel"}
                        {account.type === "LIVRET_A" && "Livret A"}
                        {account.type === "PEL" && "PEL"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {Number(account.balance).toLocaleString("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </TableCell>
                    <TableCell>
                      {account.status === "ACTIVE" && (
                        <Badge variant="default" className="bg-green-500">
                          Actif
                        </Badge>
                      )}
                      {account.status === "BLOCKED" && (
                        <Badge variant="destructive">Bloqué</Badge>
                      )}
                      {account.status === "CLOSED" && (
                        <Badge variant="secondary">Fermé</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {account._count.transactions}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/admin/accounts/${account.id}/transactions`)
                        }
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
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
