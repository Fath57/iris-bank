import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllClients, useSearchClients, useDeleteClient, useUpdateClient } from "@/hooks/useAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Trash2, UserPlus, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Client } from "@/types/Admin";

export default function AdminClientsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  // Form state
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const { data: allClientsData, isLoading: isLoadingAll } = useAllClients();
  const {
    data: searchResults,
    isLoading: isSearching,
    isFetching,
  } = useSearchClients(searchTerm);
  const deleteClientMutation = useDeleteClient();
  const updateClientMutation = useUpdateClient();

  const isSearchActive = searchTerm.length > 0;
  const clients = isSearchActive
    ? searchResults?.clients || []
    : allClientsData?.clients || [];
  const isLoading = isSearchActive ? isSearching || isFetching : isLoadingAll;

  const handleDeleteClient = async () => {
    if (clientToDelete) {
      await deleteClientMutation.mutateAsync(clientToDelete.id);
      setClientToDelete(null);
    }
  };

  const handleEditClient = (client: Client) => {
    setClientToEdit(client);
    setEditForm({
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phoneNumber: client.phoneNumber,
      address: {
        street: client.address?.street || "",
        city: client.address?.city || "",
        state: client.address?.state || "",
        zipCode: client.address?.zipCode || "",
        country: client.address?.country || "",
      },
    });
  };

  const handleSaveClient = async () => {
    if (clientToEdit) {
      await updateClientMutation.mutateAsync({
        clientId: clientToEdit.id,
        data: editForm,
      });
      setClientToEdit(null);
    }
  };

  if (isLoading && clients.length === 0) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
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
          <h1 className="text-3xl font-bold">Gestion des Clients</h1>
          <p className="text-muted-foreground">
            {isSearchActive
              ? `${clients.length} résultat(s) pour "${searchTerm}"`
              : `${allClientsData?.total || 0} client(s) au total`}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, email, téléphone ou IBAN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            {isSearching && (
              <span className="text-sm text-muted-foreground">
                Recherche...
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                {isSearchActive
                  ? "Aucun résultat trouvé"
                  : "Aucun client"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {isSearchActive
                  ? "Essayez avec un autre terme de recherche"
                  : "Aucun client enregistré pour le moment"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom Complet</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Comptes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {client.firstName} {client.lastName}
                        </p>
                        {client.deletedAt && (
                          <Badge variant="destructive" className="mt-1">
                            Supprimé
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phoneNumber}</TableCell>
                    <TableCell>{client.address?.city || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {client._count?.accounts || 0}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/clients/${client.id}`)
                          }
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                        {!client.deletedAt && (
                          <>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleEditClient(client)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Modifier
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setClientToDelete(client)}
                              disabled={deleteClientMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Supprimer
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog de modification */}
      <Dialog open={!!clientToEdit} onOpenChange={() => setClientToEdit(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le client</DialogTitle>
            <DialogDescription>
              Modifiez les informations de{" "}
              <strong>
                {clientToEdit?.firstName} {clientToEdit?.lastName}
              </strong>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={editForm.firstName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={editForm.lastName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Téléphone</Label>
                <Input
                  id="phoneNumber"
                  value={editForm.phoneNumber}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phoneNumber: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="street">Adresse</Label>
              <Input
                id="street"
                value={editForm.address.street}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    address: { ...editForm.address, street: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="zipCode">Code postal</Label>
                <Input
                  id="zipCode"
                  value={editForm.address.zipCode}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      address: { ...editForm.address, zipCode: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  value={editForm.address.city}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      address: { ...editForm.address, city: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="state">Région</Label>
                <Input
                  id="state"
                  value={editForm.address.state}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      address: { ...editForm.address, state: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                value={editForm.address.country}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    address: { ...editForm.address, country: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setClientToEdit(null)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSaveClient}
              disabled={updateClientMutation.isPending}
            >
              {updateClientMutation.isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog
        open={!!clientToDelete}
        onOpenChange={() => setClientToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le client{" "}
              <strong>
                {clientToDelete?.firstName} {clientToDelete?.lastName}
              </strong>{" "}
              ?<br />
              Cette action est irréversible. Le client aura toujours accès à
              ses comptes existants mais ne pourra plus se connecter.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteClient}
              className="bg-destructive hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
