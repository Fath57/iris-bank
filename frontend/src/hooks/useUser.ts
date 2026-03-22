import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await api.get('/users/profile');
      return response.data.data.user; 
    },
    refetchOnWindowFocus: false, 
  });
};