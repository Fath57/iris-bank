import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardLayout from "./components/layouts/dashboard-layout"
import DashboardPage from "./pages/DashboardHomePage"
import ProtectedRoute from "./components/ProtectedRoute"

// Importe ton nouveau wrapper
import AuthInitializer from "./components/AuthInitializer"
import MyAccountsPage from "./pages/MyAccountsPage"
import NewTransactionPage from "./pages/NewTransactionPage"

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "settings", element: <div>Page Paramètres</div> },
          { path: "users", element: <div>Page Utilisateurs</div> },
          //{ path: "accounts/:id", element: <AccountDetailPage /> }
        ]
      },
      {
        path: "/accounts",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <MyAccountsPage /> },
        ]
      },
      {
        path: "/transactions/new",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <NewTransactionPage /> },
        ]
      }
    ]
  }
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        <RouterProvider router={router} />
      </AuthInitializer>
    </QueryClientProvider>
  )
}