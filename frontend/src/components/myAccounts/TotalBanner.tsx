import { ArrowLeftRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatAmount } from "@/lib/format";

interface TotalBannerProps {
  total: number;
  userName?: string;
}

export function TotalBanner({ total, userName }: TotalBannerProps) {
  const navigate = useNavigate();

  const today = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="flex items-center justify-between rounded-xl border bg-muted/40 px-8 py-4">
      <div className="py-2">
        <p className="text-sm text-muted-foreground">
          Bonjour {userName} — situation au {today}
        </p>
        <p className="text-3xl font-semibold tracking-tight py-2">{formatAmount(total)}</p>
        <p className="text-xs text-muted-foreground">Solde total consolidé</p>
      </div>
      <Button size="lg" onClick={() => navigate("/accounts/create")}>
        <Plus className="mr-2 h-3.5 w-3.5" />
        Créer un compte
      </Button>
    </div>
  );
}