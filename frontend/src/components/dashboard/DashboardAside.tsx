import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ShieldCheck, Loader2 } from "lucide-react";
import { useUserProfile } from "@/hooks/useUser";
import { Link } from "react-router-dom";

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
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-6 text-center text-destructive border border-destructive/30 bg-destructive/5 rounded-xl">
        Erreur lors du chargement du profil.
      </div>
    );
  }

  const { firstName, lastName, email, phoneNumber, role, address } = user as UserProfile;

  return (
    <div className="animate-fade-up delay-400 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Mon profil</h2>
        <Link to="/settings">
          <Button variant="outline" size="sm">Modifier</Button>
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden border border-border/60 shadow-sm">
        {/* Identity */}
        <div className="bg-muted/40 px-5 sm:px-6 py-4 border-b border-border/60 flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">{firstName} {lastName}</p>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-primary" />
              {role === "ADMIN" ? "Administrateur" : role === "SUPPORT" ? "Support" : "Client"}
            </p>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" title="En ligne" />
        </div>

        {/* Contact info */}
        <div className="px-5 sm:px-6 py-4 flex flex-col gap-3.5 bg-card">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-foreground truncate">{email}</span>
          </div>

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
