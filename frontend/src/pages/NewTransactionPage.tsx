import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { TransactionRecap } from "@/components/transaction/TransactionRecap";
import { TransactionForm } from "@/components/transaction/TransactionForm";
import { ConfirmTransactionModal } from "@/components/transaction/ConfirmTransactionModal";
import type { TransactionFormValues } from "@/types/TransactionForm";
import { useAccounts } from "@/hooks/useAccounts";
import { useVerifyTransaction, useExecuteTransaction } from "@/hooks/useTransactions";

export default function NewTransactionPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<TransactionFormValues | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: accountsData, isLoading: isLoadingAccounts } = useAccounts();
  const verifyMutation = useVerifyTransaction();
  const executeMutation = useExecuteTransaction();

  const accounts = accountsData?.accounts || [];

  console.log("Le vrai tableau de comptes :", accounts);

  useEffect(() => {
    if (accounts.length > 0 && !values) {
      setValues({
        mode: "externe",
        fromAccountName: accounts[0].name || "Compte Principal",
        fromAccountIban: accounts[0].iban,
        fromAccountBalance: accounts[0].balance,
        toBeneficiaryName: "",
        toBeneficiaryIban: "",
        amount: 0,
        motif: "",
      });
    }
  }, [accounts, values]);

  const handleVerify = () => {
    if (!values) return;
    verifyMutation.mutate(
      {
        fromAccountIban: values.fromAccountIban,
        toBeneficiaryIban: values.toBeneficiaryIban,
        amount: values.amount,
      },
      {
        onSuccess: () => setShowConfirm(true),
        onError: (error) => {
          console.error("Erreur lors de la vérification", error);
          // TODO: Ajouter un toast d'erreur ici si tu en as un
        },
      }
    );
  };

  const handleConfirm = () => {
    if (!values) return;
    executeMutation.mutate(
      {
        fromAccountIban: values.fromAccountIban,
        toBeneficiaryIban: values.toBeneficiaryIban,
        amount: values.amount,
        toBeneficiaryName: values.toBeneficiaryName,
        motif: values.motif,
        mode: values.mode,
      },
      {
        onSuccess: () => {
          setShowConfirm(false);
          navigate("/dashboard", {
            state: { success: true, amount: values.amount, beneficiary: values.toBeneficiaryName },
          });
        },
        onError: (error) => {
          console.error("Erreur lors de l'exécution", error);
          // TODO: Ajouter un toast d'erreur ici
        },
      }
    );
  };
  if (isLoadingAccounts) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <div className="flex h-[50vh] items-center justify-center flex-col gap-2">
        <h2 className="text-xl font-semibold">Aucun compte trouvé</h2>
        <p className="text-muted-foreground text-sm">Vous devez avoir au moins un compte pour effectuer un virement.</p>
      </div>
    );
  }

  if (!values) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nouvelle transaction</h1>
          <p className="text-sm text-muted-foreground">Virement SEPA instantané</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* On passe les vrais comptes au formulaire */}
        <TransactionForm values={values} onChange={setValues} accounts={accounts} />
        
        {/* On bloque le bouton pendant la vérification */}
        <TransactionRecap 
          values={values} 
          onSubmit={handleVerify} 
          isPending={verifyMutation.isPending} 
        />
      </div>

      {showConfirm && (
        <ConfirmTransactionModal
          values={values}
          onConfirm={handleConfirm}
          onClose={() => setShowConfirm(false)}
          isPending={executeMutation.isPending}
        />
      )}
    </div>
  );
}