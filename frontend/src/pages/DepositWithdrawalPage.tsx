import { Loader2, CheckCircle2 } from "lucide-react";
import { useAccounts } from "@/hooks/useAccounts";
import { useDepositWithdrawalForm } from "@/hooks/useDepositWithdrawalForm";
import { AccountSelector } from "@/components/deposit-withdrawal/AccountSelector";
import { OperationSelector } from "@/components/deposit-withdrawal/OperationSelector";
import { AmountForm } from "@/components/deposit-withdrawal/AmountForm";
import { OperationSummary } from "@/components/deposit-withdrawal/OperationSummary";
import { TransactionHistory } from "@/components/deposit-withdrawal/TransactionHistory";

export default function DepositWithdrawalPage() {
  const { data, isLoading, isError } = useAccounts();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !data || !data.accounts) {
    return (
      <div className="p-6 text-center text-destructive border border-destructive/30 bg-destructive/5 rounded-xl m-6">
        Erreur lors du chargement de vos comptes.
      </div>
    );
  }

  if (data.accounts.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground border border-border rounded-xl m-6">
        Vous n'avez aucun compte bancaire. Veuillez d'abord créer un compte.
      </div>
    );
  }

  const activeAccounts = data.accounts.filter(
    (account: { status: string }) => account.status === "ACTIVE"
  );

  if (activeAccounts.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground border border-border rounded-xl m-6">
        Vous n'avez aucun compte actif disponible pour cette opération.
      </div>
    );
  }

  return <DepositWithdrawalContent accounts={activeAccounts} />;
}

function DepositWithdrawalContent({ accounts }: { accounts: any[] }) {
  const form = useDepositWithdrawalForm({ initialAccountId: accounts[0]?.id });

  const selectedAccount = accounts.find((a: any) => a.id === form.selectedAccountId) ?? accounts[0];

  const isOverdraft =
    form.operation === "WITHDRAWAL" &&
    form.isValid &&
    (form.parsed ?? 0) > Number(selectedAccount?.balance ?? 0);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium mb-1">
            Opérations
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Dépôt &amp; Retrait</h2>
        </div>
        {form.success && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-400 font-medium animate-fade-up">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            Opération enregistrée avec succès
          </div>
        )}
      </div>

      {/* Main layout — stacks on mobile, side-by-side on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3 space-y-5">
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

        <div className="lg:col-span-2 lg:sticky lg:top-6 space-y-5">
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
