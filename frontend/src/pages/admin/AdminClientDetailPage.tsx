import { useParams, useNavigate } from "react-router-dom";
import { useClientById, useBlockAccount, useUnblockAccount } from "@/hooks/useAdmin";
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
import { ArrowLeft, CreditCard, ShieldAlert, ShieldCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: client, isLoading } = useClientById(id!);
  const blockAccountMutation = useBlockAccount();
  const unblockAccountMutation = useUnblockAccount();

  const [blockDialog, setBlockDialog] = useState<{
    accountId: number;
    iban: string;
  } | null>(null);
  const [unblockDialog, setUnblockDialog] = useState<{
    accountId: number;
    iban: string;
  } | null>(null);
  const [blockReason, setBlockReason] = useState("");
  const [unblockReason, setUnblockReason] = useState("");

  const handleBlockAccount = async () => {
    if (blockDialog && blockReason.length >= 10) {
      await blockAccountMutation.mutateAsync({
        accountId: blockDialog.accountId,
        reason: blockReason,
      });
      setBlockDialog(null);
      setBlockReason("");
    }
  };

  const handleUnblockAccount = async () => {
    if (unblockDialog) {
      await unblockAccountMutation.mutateAsync({
        accountId: unblockDialog.accountId,
        reason: unblockReason || undefined,
      });
      setUnblockDialog(null);
      setUnblockReason("");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-6">
        <p>Client non trouvé</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {client.firstName} {client.lastName}
          </h1>
          <p className="text-muted-foreground">{client.email}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informations personnelles */}
        <Card>
          <CardHeader>
            <CardTitle>Informations Personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{client.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p className="font-medium">{client.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Adresse</p>
              {client.address ? (
                <p className="font-medium">
                  {client.address.street}
                  <br />
                  {client.address.zipCode} {client.address.city}
                  <br />
                  {client.address.state}, {client.address.country}
                </p>
              ) : (
                <p className="text-muted-foreground">Non renseignée</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date d'inscription</p>
              <p className="font-medium">
                {new Date(client.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Comptes bancaires</p>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {client._count?.accounts || 0}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Bénéficiaires</p>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {client._count?.beneficiaries || 0}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des comptes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Comptes Bancaires ({client.accounts?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {client.accounts && client.accounts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>IBAN</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Solde</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {client.accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-mono text-sm">
                      {account.iban}
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
                    <TableCell className="text-right">
                      {account.status === "ACTIVE" ? (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            setBlockDialog({
                              accountId: account.id,
                              iban: account.iban,
                            })
                          }
                        >
                          <ShieldAlert className="h-4 w-4 mr-1" />
                          Bloquer
                        </Button>
                      ) : account.status === "BLOCKED" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setUnblockDialog({
                              accountId: account.id,
                              iban: account.iban,
                            })
                          }
                        >
                          <ShieldCheck className="h-4 w-4 mr-1" />
                          Débloquer
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Aucun compte bancaire
            </p>
          )}
        </CardContent>
      </Card>

      {/* Dialog de blocage */}
      <Dialog open={!!blockDialog} onOpenChange={() => setBlockDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bloquer le compte</DialogTitle>
            <DialogDescription>
              Compte : <span className="font-mono">{blockDialog?.iban}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="blockReason">Raison du blocage *</Label>
              <Input
                id="blockReason"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="Ex: Activité suspecte détectée"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 10 caractères
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockDialog(null)}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleBlockAccount}
              disabled={
                blockReason.length < 10 || blockAccountMutation.isPending
              }
            >
              Bloquer le compte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de déblocage */}
      <Dialog
        open={!!unblockDialog}
        onOpenChange={() => setUnblockDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Débloquer le compte</DialogTitle>
            <DialogDescription>
              Compte : <span className="font-mono">{unblockDialog?.iban}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="unblockReason">Raison du déblocage (optionnel)</Label>
              <Input
                id="unblockReason"
                value={unblockReason}
                onChange={(e) => setUnblockReason(e.target.value)}
                placeholder="Ex: Vérifications effectuées"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUnblockDialog(null)}>
              Annuler
            </Button>
            <Button
              onClick={handleUnblockAccount}
              disabled={unblockAccountMutation.isPending}
            >
              Débloquer le compte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
