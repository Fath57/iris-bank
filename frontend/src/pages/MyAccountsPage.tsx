import { AccountCard } from "@/components/myAccounts/AccountCard";
import { TotalBanner } from "@/components/myAccounts/TotalBanner";
import useAuthStore from "@/store/authStore";
import { useAccounts } from "@/hooks/useAccounts";
import { Loader2 } from "lucide-react";

export default function MyAccountsPage() {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading, isError } = useAccounts();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Chargement de vos comptes...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-center text-destructive border border-destructive rounded-xl m-6">
        Erreur lors du chargement de vos comptes.
      </div>
    );
  }

  const { totalBalance, accounts } = data;

  return (
    <div className="space-y-6 p-6">
      <TotalBanner total={totalBalance} userName={user?.firstName} />

      <div className="flex items-center justify-between mb-6 mt-14">
        <div>
          <h2 className="text-2xl text-foreground font-bold tracking-tight">Mes comptes</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account: any) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}