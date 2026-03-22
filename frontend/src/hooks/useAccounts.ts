import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

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