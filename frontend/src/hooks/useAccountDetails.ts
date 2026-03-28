import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export const useAccountDetails = (accountId: string | undefined) => {
  return useQuery({
    queryKey: ['accountDetails', accountId],
    queryFn: async () => {
      if (!accountId) throw new Error("ID du compte manquant");
      const response = await api.get(`/accounts/${accountId}`);
      return response.data.data;
    },
    enabled: !!accountId,
    refetchOnWindowFocus: false,
  });
};