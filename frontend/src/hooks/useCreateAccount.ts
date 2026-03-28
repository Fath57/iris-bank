import api from '@/api/axios';
import type { CreateAccountPayload } from '@/types/CreateAccount';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAccountPayload) => {
      const response = await api.post('/accounts/create', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
}