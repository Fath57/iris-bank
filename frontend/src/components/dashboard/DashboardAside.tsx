import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ShieldCheck, Loader2 } from "lucide-react";
import { useUserProfile } from "@/hooks/useUser";

interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  address?: Address;
}

export default function DashboardAside() {
  const { data: user, isLoading, isError } = useUserProfile();

  if (isLoading) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Chargement du profil...</p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-6 text-center text-destructive border border-destructive rounded-xl">
        Erreur lors du chargement du profil.
      </div>
    );
  }

  const { firstName, lastName, email, phoneNumber, role, address } = user as UserProfile;

  return (
    <div className="flex flex-col h-full">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl text-foreground font-bold tracking-tight">Mon profil</h2>
        <Button className="cursor-pointer p-4">Modifier</Button>
      </div>

      <div className="rounded-xl overflow-hidden border">

        {/* Identité */}
        <div className="bg-muted/50 px-6 py-4 border-b flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">{firstName} {lastName}</p>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-primary" />
              {role === "ADMIN" ? "Administrateur" : role === "SUPPORT" ? "Support" : "Client"}
            </p>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" title="En ligne" />
        </div>

        {/* Coordonnées */}
        <div className="px-6 py-4 flex flex-col gap-3.5 bg-background">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-foreground">{email}</span>
          </div>
          
          {/* On vérifie si phoneNumber existe car il pourrait être null en BDD */}
          {phoneNumber && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground">{phoneNumber}</span>
            </div>
          )}

          {address && (
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground leading-snug">
                {address.street}, {address.zipCode} {address.city}, {address.country}
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}