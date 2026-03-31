import {
  LayoutDashboard,
  Users,
  CreditCard,
  ShieldCheck,
} from "lucide-react"

export const AdminSidebarConfig = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Clients",
      url: "/admin/clients",
      icon: Users,
    },
    {
      title: "Comptes",
      url: "/admin/accounts",
      icon: CreditCard,
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "/admin/settings",
      icon: ShieldCheck,
    },
  ],
}
