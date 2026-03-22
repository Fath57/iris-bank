import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,

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
      url: "retrait-depot",
      icon: Users,
    },
    {
      title: "Virements",
      url: "/transactions",
      icon: Users,
    },
    {
      title: "Mes comptes",
      url: "/accounts",
      icon: FileText,
    },    
  ],
  navSecondary: [
    {
      title: "Mon profil",
      url: "/profil",
      icon: Settings,
    },
  ],
}