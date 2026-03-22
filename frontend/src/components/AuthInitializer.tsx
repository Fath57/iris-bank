import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import useAuthStore from "../store/authStore";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await api.get("/auth/me");
      return response.data.data.user;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    } else if (isError) {
      logoutUser();
    } else if (!isLoading && !user) {
      useAuthStore.getState().setFinishedInitializing();
    }
  }, [user, isError, isLoading, setUser, logoutUser]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-muted-foreground">Vérification de la session...</p>
      </div>
    );
  }

  return <>{children}</>;
}