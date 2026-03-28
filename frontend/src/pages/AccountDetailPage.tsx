// frontend/src/pages/AccountDetailPage.tsx
import { useParams } from "react-router-dom";
import { AccountHero } from "@/components/accountDetails/AccountHero";
import { TransactionList } from "@/components/accountDetails/TransactionList";
import { useAccountDetails } from "@/hooks/useAccountDetails";
import { Loader2 } from "lucide-react";

export default function AccountDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: account, isLoading, isError } = useAccountDetails(id);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Chargement des détails de votre compte...</p>
      </div>
    );
  }

  if (isError || !account) {
    return (
      <div className="p-6 text-center text-destructive border border-destructive rounded-xl m-6">
        Erreur lors du chargement du compte. Il est possible qu'il n'existe pas ou que vous n'y ayez pas accès.
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground p-6">
      <div className="space-y-6">
        <AccountHero
          type={account.type}
          status={account.status}
          balance={account.balance}
          iban={account.iban}
          createdAt={account.createdAt}
          ownerName={`${account.user.firstName} ${account.user.lastName}`} 
        />

        <TransactionList transactions={account.transactions} />
      </div>
    </div>
  );
}