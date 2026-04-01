import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import useAuthStore from "../store/authStore";

// Étape 1 : génère le secret + QR code
export const useSetup2FA = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post<{
        status: string;
        data: { qrCode: string; secret: string };
      }>("/users/2fa/setup");
      return response.data.data;
    },
  });
};

// Étape 2 : confirme avec le premier code TOTP → active le 2FA
export const useConfirm2FA = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) => {
      const response = await api.post("/users/2fa/confirm", { code });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

// Désactivation : exige un code TOTP valide
export const useDisable2FA = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (code: string) => {
      const response = await api.post("/users/2fa/disable", { code });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

// Vérification TOTP lors du login (étape 2FA)
export const useVerify2FALogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: async (payload: { userId: number; code: string }) => {
      const response = await api.post("/auth/2fa/verify", payload);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.data.user);
    },
  });
};
