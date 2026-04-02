// frontend/src/hooks/useCloseAccount.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

export const useCloseAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accountId: string) => {
      const response = await api.patch(`/accounts/${accountId}/close`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userAccounts'] });
      queryClient.invalidateQueries({ queryKey: ['accountStats'] });
    },
  });
};