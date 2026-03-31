import {
  LayoutDashboard,
  FileText,
  Settings,
  ArrowDownUp,
  Send,
} from "lucide-react"


export const SidebarConfig = {
  navMain: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Retrait / Dépôt",
      url: "/deposit-withdraw",
      icon: ArrowDownUp,
    },
    {
      title: "Virements",
      url: "/transactions",
      icon: Send,
    },
    {
      title: "Mes comptes",
      url: "/accounts",
      icon: FileText,
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "/settings",
      icon: Settings,
    },
  ],
}