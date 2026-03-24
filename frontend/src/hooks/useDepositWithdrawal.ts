import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

interface Payload {
  accountId: string;
  amount: number;
  description?: string;
}

const useDeposit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Payload) =>
      api.post("/transactions/deposit", payload).then((r) => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userAccounts"] }),
  });
};

const useWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Payload) =>
      api.post("/transactions/withdrawal", payload).then((r) => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userAccounts"] }),
  });
};

export { useDeposit, useWithdrawal };