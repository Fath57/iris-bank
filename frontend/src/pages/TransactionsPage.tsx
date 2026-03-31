import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAccounts, useAccountById } from "@/hooks/useAccounts";
import AccountHeader from "@/components/transactions/AccountHeader";
import TransactionFilters, { type Filters } from "@/components/transactions/TransactionFilters";
import TransactionsTable from "@/components/transactions/TransactionTable";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: "ALL",
    dateFrom: "",
    dateTo: "",
    amountMax: "",
  });

  const { data: accountsData, isLoading: isLoadingAccounts, isError: isErrorAccounts } = useAccounts();

  const accounts = accountsData?.accounts ?? [];
  const effectiveAccountId = selectedAccountId ?? accounts[0]?.id ?? null;

  const {
    data: accountDetail,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = useAccountById(effectiveAccountId);

  const handleAccountChange = (id: number) => {
    setSelectedAccountId(id);
    setFilters({ search: "", type: "ALL", dateFrom: "", dateTo: "", amountMax: "" });
  };

  const handleNewTransfer = () => {
    navigate("/transactions/new");
  };

  const filtered = useMemo(() => {
    const transactions = accountDetail?.transactions ?? [];
    return transactions.filter((t) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchDesc = t.description?.toLowerCase().includes(q);
        const matchBenef = t.beneficiary?.name.toLowerCase().includes(q);
        if (!matchDesc && !matchBenef) return false;
      }
      if (filters.type !== "ALL" && t.type !== filters.type) return false;
      if (filters.dateFrom && t.date < filters.dateFrom) return false;
      if (filters.dateTo && t.date > filters.dateTo) return false;
      if (filters.amountMax && Math.abs(t.amount) > parseFloat(filters.amountMax)) return false;
      return true;
    });
  }, [accountDetail, filters]);

  if (isLoadingAccounts) {
    return (
      <div className="flex items-center justify-center h-64 gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm">Chargement des comptes...</span>
      </div>
    );
  }

  if (isErrorAccounts) {
    return (
      <div className="p-6 text-center text-destructive border border-destructive rounded-xl max-w-md mx-auto mt-10">
        Erreur lors du chargement des comptes.
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Transactions</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Historique de vos opérations</p>
      </div>

      <AccountHeader
        accounts={accounts}
        selectedId={effectiveAccountId ?? 0}
        onSelect={handleAccountChange}
        onNewTransfer={handleNewTransfer}
      />

      <TransactionFilters filters={filters} onChange={setFilters} />

      {isLoadingDetail ? (
        <div className="flex items-center justify-center h-48 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Chargement des transactions...</span>
        </div>
      ) : isErrorDetail ? (
        <div className="p-6 text-center text-destructive border border-destructive rounded-xl">
          Erreur lors du chargement des transactions.
        </div>
      ) : (
        <TransactionsTable transactions={filtered} />
      )}
    </div>
  );
}