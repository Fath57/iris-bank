import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/authStore";

export default function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuthStore();

  if (isInitializing) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}