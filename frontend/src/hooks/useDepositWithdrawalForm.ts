import { useState } from "react";
import { useDeposit, useWithdrawal } from "@/hooks/useDepositWithdrawal";
import { parseAmount } from "@/lib/format";
import type { Op } from "@/types/Banking";

interface UseDepositWithdrawalFormProps {
  initialAccountId: string;
}

export function useDepositWithdrawalForm({ initialAccountId }: UseDepositWithdrawalFormProps) {
  const [operation, setOperation] = useState<Op>("DEPOSIT");
  const [selectedAccountId, setSelectedAccountId] = useState(initialAccountId);
  const [amount, setAmount] = useState("");
  const [motif, setMotif] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { mutate: deposit, isPending: depositPending } = useDeposit();
  const { mutate: withdraw, isPending: withdrawPending } = useWithdrawal();
  const isPending = depositPending || withdrawPending;

  const parsed = parseAmount(amount);
  const isValid = parsed !== null;

  const handleAmountChange = (val: string) => {
    setAmount(val);
    setError("");
  };

  const handleOperationChange = (op: Op) => {
    setOperation(op);
    setError("");
  };

  const handleAccountChange = (id: string) => {
    setSelectedAccountId(id);
    setError("");
  };

  const handleSubmit = (_currentBalance: number, isOverdraft: boolean) => {
    setError("");
    if (!isValid) { setError("Veuillez saisir un montant valide."); return; }
    if (isOverdraft) { setError("Solde insuffisant pour ce retrait."); return; }

    const payload = {
      accountId: selectedAccountId,
      amount: parsed!,
      description: motif || undefined,
    };

    const callbacks = {
      onSuccess: () => {
        setSuccess(true);
        setAmount("");
        setMotif("");
        setTimeout(() => setSuccess(false), 4000);
      },
      onError: (err: any) => {
        setError(err?.response?.data?.message || "Une erreur est survenue.");
      },
    };

    operation === "DEPOSIT" ? deposit(payload, callbacks) : withdraw(payload, callbacks);
  };

  return {
    operation, selectedAccountId, amount, motif, error, success, isPending,
    parsed, isValid,
    handleAmountChange, handleOperationChange, handleAccountChange, handleSubmit,
    setMotif,
  };
}