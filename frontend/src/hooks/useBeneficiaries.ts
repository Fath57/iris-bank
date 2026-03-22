import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

export const useBeneficiaries = () => {
  return useQuery({
    queryKey: ['userBeneficiaries'],
    queryFn: async () => {
      const response = await api.get('/beneficiaries');
      return response.data.data.beneficiaries;
    },
    refetchOnWindowFocus: false,
  });
};

export const useAddBeneficiary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; iban: string }) => {
      const response = await api.post('/beneficiaries/add', data);
      return response.data.data.beneficiary;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userBeneficiaries'] });
    },
  });
};