import api from '@/api/axios';
import { useMutation } from '@tanstack/react-query';
import { create } from 'zustand';

export interface User {
  id: number;
  email: string;
  role?: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setUser: (user: User) => void;
  logoutUser: () => void;
  setFinishedInitializing: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  setUser: (userData) => set({ 
    user: userData, 
    isAuthenticated: true, 
    isInitializing: false 
  }),
  logoutUser: () => set({ 
    user: null, 
    isAuthenticated: false, 
    isInitializing: false 
  }),
  setFinishedInitializing: () => set({ isInitializing: false }),
}));


export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (userData: Record<string, string>) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.data.user);
    },
  });
};

export default useAuthStore;