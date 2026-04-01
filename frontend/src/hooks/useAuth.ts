import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

interface RegisterPayload {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (credentials: Record<string, string>) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.data?.user) {
        setUser(data.data.user);
      }
    },
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (userData: RegisterPayload) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.data.user);
    },
  });
};