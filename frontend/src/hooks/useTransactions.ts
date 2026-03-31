import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import type { TransactionFormValues } from '../types/TransactionForm';

export type ExecuteTransactionPayload = Pick<
  TransactionFormValues,
  'fromAccountIban' | 'toBeneficiaryIban' | 'amount' | 'toBeneficiaryName' | 'motif' | 'mode'
>;

export const useVerifyTransaction = () => {
  return useMutation({
    mutationFn: async (data: { fromAccountIban: string; toBeneficiaryIban: string; amount: number }) => {
      const response = await api.post('/transactions/verify', data);
      return response.data;
    },
  });
};

export const useExecuteTransaction = () => {
  return useMutation({
    mutationFn: async (data: ExecuteTransactionPayload) => {
      const response = await api.post('/transactions/execute', data);
      return response.data;
    },
  });
};