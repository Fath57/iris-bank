import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import type { GetAccountByIdResponse } from '@/types/Transaction';

export const useAccounts = () => {
  return useQuery({
    queryKey: ['userAccounts'],
    queryFn: async () => {
      const response = await api.get('/accounts/getByUser'); 
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useAccountById = (accountId: number | null) => {
  return useQuery({
    queryKey: ["account", accountId],
    queryFn: async () => {
      const response = await api.get<GetAccountByIdResponse>(`/accounts/${accountId}`);
      return response.data.data;
    },
    enabled: accountId !== null,
    refetchOnWindowFocus: false,
  });
};