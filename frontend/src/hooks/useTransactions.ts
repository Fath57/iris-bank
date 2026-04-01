import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';

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
    mutationFn: async (data: any) => {
      const response = await api.post('/transactions/execute', data);
      return response.data;
    },
  });
};