// frontend/src/components/accountDetails/AccountHero.tsx
import type { AccountStatus, AccountType } from "@/data/accountDetails";
import { accountTypeLabels } from "@/data/accountDetails";
import { formatAmount, formatDateLong } from "@/lib/format";
import { statusConfig } from "@/config/account.config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCloseAccount } from "@/hooks/useCloseAccount";
import { Trash2, AlertTriangle, Loader2, X } from "lucide-react";

interface AccountHeroProps {
  accountId: string; // Ajout de l'ID
  type: AccountType;
  status: AccountStatus;
  balance: number;
  iban: string;
  createdAt: string;
  ownerName: string;
}

export function AccountHero({ accountId, type, status, balance, iban, createdAt, ownerName }: AccountHeroProps) {
  const s = statusConfig[status];
  const navigate = useNavigate();
  const { mutate: closeAccount, isPending } = useCloseAccount();
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCloseRequest = () => {
    if (balance === 0) {
      setShowConfirm(true);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm relative">
      <div className="flex flex-col gap-6">
        
        {/* Ligne du haut : Type, Statut & Bouton Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-secondary text-secondary-foreground">
              {accountTypeLabels[type]}
            </span>
            <div className="flex items-center gap-1.5 px-2 py-1">
              <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground italic hidden sm:inline">
              {ownerName}
            </span>
            {status !== "CLOSED" && (
              <button 
                onClick={handleCloseRequest}
                className="flex items-center gap-2 text-xs font-medium text-destructive hover:bg-destructive/10 px-2 py-1.5 rounded-md transition-colors border border-transparent hover:border-destructive/20"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clôturer
              </button>
            )}
          </div>
        </div>

        {/* Solde principal */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-tight">Solde disponible</p>
          <p className="text-4xl font-bold tracking-tighter tabular-nums text-foreground">
            {formatAmount(balance)}
          </p>
        </div>

        {/* Détails IBAN / Date */}
        <div className="grid grid-cols-2 gap-8 pt-6 border-t border-border/50">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">IBAN</p>
            <p className="text-sm font-mono text-foreground break-all tracking-tight">
              {iban}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Depuis le</p>
            <p className="text-sm font-medium text-foreground">
              {formatDateLong(createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* MODALE ERREUR : Solde > 0 */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border shadow-xl rounded-xl w-full max-w-sm p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="h-12 w-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Action impossible</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Le solde doit être de 0,00 € pour clôturer le compte. (Actuel: {formatAmount(balance)})
            </p>
            <button 
              onClick={() => setShowError(false)}
              className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium"
            >
              Compris
            </button>
          </div>
        </div>
      )}

      {/* MODALE CONFIRMATION : Solde == 0 */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border shadow-xl rounded-xl w-full max-w-sm animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-destructive mb-2">Clôturer le compte ?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Cette action est définitive. Vous ne pourrez plus effectuer de transactions sur ce compte.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2 border rounded-md text-sm font-medium hover:bg-accent"
                >
                  Annuler
                </button>
                <button 
                  onClick={() => closeAccount(accountId, { onSuccess: () => navigate("/dashboard") })}
                  disabled={isPending}
                  className="flex-1 py-2 bg-destructive text-white rounded-md text-sm font-medium flex justify-center items-center"
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirmer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}