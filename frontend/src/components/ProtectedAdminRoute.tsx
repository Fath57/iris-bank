import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/authStore";

export default function ProtectedAdminRoute() {
  const { user, isAuthenticated, isInitializing } = useAuthStore();

  if (isInitializing) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin or support role
  if (user?.role !== "ADMIN" && user?.role !== "SUPPORT") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
