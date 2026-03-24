import { Loader2, CheckCircle2 } from "lucide-react";
import { useAccounts } from "@/hooks/useAccounts";
import { useDepositWithdrawalForm } from "@/hooks/useDepositWithdrawalForm";
import { AccountSelector } from "@/components/deposit-withdrawal/AccountSelector";
import { OperationSelector } from "@/components/deposit-withdrawal/OperationSelector";
import { AmountForm } from "@/components/deposit-withdrawal/AmountForm";
import { OperationSummary } from "@/components/deposit-withdrawal/OperationSummary";
import { TransactionHistory } from "@/components/deposit-withdrawal/TransactionHistory";

// 1. Le composant parent s'occupe UNIQUEMENT de récupérer les données et des états de chargement
export default function DepositWithdrawalPage() {
  const { data, isLoading, isError } = useAccounts();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Chargement de vos comptes…</p>
      </div>
    );
  }

  if (isError || !data || !data.accounts) {
    return (
      <div className="p-6 text-center text-destructive border border-destructive rounded-xl m-6">
        Erreur lors du chargement de vos comptes.
      </div>
    );
  }

  return <DepositWithdrawalContent accounts={data.accounts} />;
}

function DepositWithdrawalContent({ accounts }: { accounts: any[] }) {
  const form = useDepositWithdrawalForm({ initialAccountId: accounts[0]?.id });

  const selectedAccount = accounts.find((a: any) => a.id === form.selectedAccountId) ?? accounts[0];
  
  const isOverdraft =
    form.operation === "WITHDRAWAL" &&
    form.isValid &&
    (form.parsed ?? 0) > Number(selectedAccount?.balance ?? 0);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium mb-1">
            Opérations
          </p>
          <h2 className="text-2xl font-bold tracking-tight">Dépôt &amp; Retrait</h2>
        </div>
        {form.success && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700 font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Opération enregistrée avec succès
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-6 items-start">
        <div className="col-span-3 space-y-5">
          <AccountSelector
            accounts={accounts}
            selectedAccountId={form.selectedAccountId}
            onSelect={form.handleAccountChange}
          />
          <OperationSelector
            operation={form.operation}
            onChange={form.handleOperationChange}
          />
          <AmountForm
            amount={form.amount}
            motif={form.motif}
            error={form.error}
            isOverdraft={isOverdraft}
            onAmountChange={form.handleAmountChange}
            onMotifChange={form.setMotif}
          />
        </div>

        <div className="col-span-2 sticky top-6 space-y-5">
          <OperationSummary
            operation={form.operation}
            selectedAccount={selectedAccount}
            parsed={form.parsed}
            isValid={form.isValid}
            isOverdraft={isOverdraft}
            motif={form.motif}
            isPending={form.isPending}
            onSubmit={() => form.handleSubmit(Number(selectedAccount.balance), isOverdraft)}
          />
          <TransactionHistory transactions={selectedAccount.transactions ?? []} />
        </div>
      </div>
    </div>
  );
}