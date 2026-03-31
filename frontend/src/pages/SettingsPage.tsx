import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, MapPin, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TwoFAModal } from "@/components/TwoFAModal";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  twoFactorEnabled: boolean;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  } | null;
}

const roleLabels: Record<string, { label: string; className: string }> = {
  USER: { label: "Utilisateur", className: "bg-blue-100 text-blue-700" },
  ADMIN: { label: "Administrateur", className: "bg-purple-100 text-purple-700" },
  SUPPORT: { label: "Support", className: "bg-green-100 text-green-700" },
};

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [twoFAModalOpen, setTwoFAModalOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await api.get<{
        status: string;
        data: { user: UserProfile };
      }>("/users/profile");
      return response.data.data.user;
    },
  });

  useEffect(() => {
    if (data) {
      setTwoFactorEnabled(data.twoFactorEnabled ?? false);
    }
  }, [data]);

  const changePasswordMutation = useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const response = await api.put("/users/change-password", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Mot de passe modifié avec succès");
      setPasswordDialogOpen(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erreur lors du changement de mot de passe");
    },
  });

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    changePasswordMutation.mutate({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });
  };

  const handle2FAToggle = (_checked: boolean) => {
    setTwoFAModalOpen(true);
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

  if (!data) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Impossible de charger les paramètres</p>
      </div>
    );
  }

  const roleConfig = roleLabels[data.role] || roleLabels.USER;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Paramètres</h1>
        <p className="text-muted-foreground mt-1">
          Gérez vos informations personnelles et vos préférences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Informations Personnelles</CardTitle>
            </div>
            <CardDescription>Vos informations d'identité</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Nom complet</p>
              <p className="font-medium text-foreground">
                {data.firstName} {data.lastName}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Prénom</p>
              <p className="font-medium text-foreground">{data.firstName}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Nom</p>
              <p className="font-medium text-foreground">{data.lastName}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Coordonnées</CardTitle>
            </div>
            <CardDescription>Vos informations de contact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-medium text-foreground">{data.email}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Téléphone</p>
              <p className="font-medium text-foreground">{data.phoneNumber}</p>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Adresse</CardTitle>
            </div>
            <CardDescription>Votre adresse de résidence</CardDescription>
          </CardHeader>
          <CardContent>
            {data.address ? (
              <div className="space-y-1">
                <p className="font-medium text-foreground">{data.address.street}</p>
                <p className="text-foreground">
                  {data.address.zipCode} {data.address.city}
                </p>
                <p className="text-muted-foreground">{data.address.country}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune adresse renseignée</p>
            )}
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Informations du Compte</CardTitle>
            </div>
            <CardDescription>Statut et permissions de votre compte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Rôle</p>
              <Badge className={roleConfig.className}>{roleConfig.label}</Badge>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-mono text-sm text-foreground">{data.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sécurité</CardTitle>
          <CardDescription>Gérez la sécurité de votre compte</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm text-foreground">Mot de passe</p>
                <p className="text-xs text-muted-foreground">
                  Modifiez votre mot de passe régulièrement
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPasswordDialogOpen(true)}
              >
                Modifier
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-sm text-foreground">
                  Authentification à deux facteurs
                </p>
                <p className="text-xs text-muted-foreground">
                  {twoFactorEnabled ? "Activée" : "Non activée"}
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={handle2FAToggle}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le mot de passe</DialogTitle>
            <DialogDescription>
              Saisissez votre mot de passe actuel et choisissez-en un nouveau
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                }
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 8 caractères
              </p>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setPasswordDialogOpen(false);
                setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={handlePasswordChange}
              disabled={
                changePasswordMutation.isPending ||
                !passwordForm.currentPassword ||
                !passwordForm.newPassword ||
                !passwordForm.confirmPassword
              }
            >
              {changePasswordMutation.isPending ? "Modification..." : "Modifier"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2FA TOTP Modal */}
      {twoFAModalOpen && (
        <TwoFAModal
          isEnabled={twoFactorEnabled}
          onClose={() => setTwoFAModalOpen(false)}
          onSuccess={() => setTwoFactorEnabled(!twoFactorEnabled)}
        />
      )}
    </div>
  );
}
