import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import type {
  AdminStats,
  Client,
  ClientWithAccounts,
  AccountWithUser,
  AccountWithTransactions,
  UpdateClientData,
  BlockAccountData,
  UnblockAccountData,
  SearchClientsParams,
} from "@/types/Admin";
import { toast } from "sonner";

/**
 * Hook pour récupérer les statistiques admin
 */
export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const response = await api.get<{ status: string; data: AdminStats }>(
        "/admin/stats"
      );
      return response.data.data;
    },
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook pour récupérer tous les clients
 */
export const useAllClients = () => {
  return useQuery({
    queryKey: ["admin", "clients"],
    queryFn: async () => {
      const response = await api.get<{
        status: string;
        data: { clients: Client[]; total: number };
      }>("/admin/clients");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook pour rechercher des clients
 */
export const useSearchClients = (searchTerm: string) => {
  return useQuery({
    queryKey: ["admin", "clients", "search", searchTerm],
    queryFn: async () => {
      const response = await api.get<{
        status: string;
        data: { clients: Client[]; total: number; searchTerm: string };
      }>(`/admin/clients/search?q=${encodeURIComponent(searchTerm)}`);
      return response.data.data;
    },
    enabled: searchTerm.length > 0,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook pour récupérer un client par ID
 */
export const useClientById = (clientId: number | string) => {
  return useQuery({
    queryKey: ["admin", "clients", clientId],
    queryFn: async () => {
      const response = await api.get<{
        status: string;
        data: { client: ClientWithAccounts };
      }>(`/admin/clients/${clientId}`);
      return response.data.data.client;
    },
    enabled: !!clientId,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook pour mettre à jour un client
 */
export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      clientId,
      data,
    }: {
      clientId: number;
      data: UpdateClientData;
    }) => {
      const response = await api.put(`/admin/clients/${clientId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "clients"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "clients", variables.clientId],
      });
      toast.success("Client mis à jour avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erreur lors de la mise à jour"
      );
    },
  });
};

/**
 * Hook pour supprimer un client
 */
export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientId: number) => {
      const response = await api.delete(`/admin/clients/${clientId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "clients"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      toast.success("Client supprimé avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erreur lors de la suppression"
      );
    },
  });
};

/**
 * Hook pour récupérer tous les comptes
 */
export const useAllAccounts = () => {
  return useQuery({
    queryKey: ["admin", "accounts"],
    queryFn: async () => {
      const response = await api.get<{
        status: string;
        data: { accounts: AccountWithUser[]; total: number };
      }>("/admin/accounts");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook pour récupérer les comptes d'un client
 */
export const useClientAccounts = (clientId: number | string) => {
  return useQuery({
    queryKey: ["admin", "clients", clientId, "accounts"],
    queryFn: async () => {
      const response = await api.get<{
        status: string;
        data: { accounts: AccountWithUser[]; total: number };
      }>(`/admin/clients/${clientId}/accounts`);
      return response.data.data;
    },
    enabled: !!clientId,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook pour récupérer les transactions d'un compte
 */
export const useAccountTransactions = (accountId: number | string) => {
  return useQuery({
    queryKey: ["admin", "accounts", accountId, "transactions"],
    queryFn: async () => {
      const response = await api.get<{
        status: string;
        data: {
          account: AccountWithUser;
          transactions: any[];
          total: number;
        };
      }>(`/admin/accounts/${accountId}/transactions`);
      return response.data.data;
    },
    enabled: !!accountId,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook pour bloquer un compte
 */
export const useBlockAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      accountId,
      reason,
    }: {
      accountId: number;
      reason: string;
    }) => {
      const response = await api.patch(
        `/admin/accounts/${accountId}/block`,
        { reason }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "accounts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "clients"] });
      toast.success("Compte bloqué avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erreur lors du blocage du compte"
      );
    },
  });
};

/**
 * Hook pour débloquer un compte
 */
export const useUnblockAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      accountId,
      reason,
    }: {
      accountId: number;
      reason?: string;
    }) => {
      const response = await api.patch(
        `/admin/accounts/${accountId}/unblock`,
        { reason }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "accounts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "clients"] });
      toast.success("Compte débloqué avec succès");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Erreur lors du déblocage du compte"
      );
    },
  });
};
