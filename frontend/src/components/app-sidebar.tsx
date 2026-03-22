import * as React from "react"
import { Command, Settings, LogOut } from "lucide-react"
import { Link, NavLink, useNavigate } from "react-router-dom" 


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarConfig } from "./sidebar-config"
import { NavMain } from "./nav-main"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate()

  const sidebarData = SidebarConfig

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="h-10 px-6 mt-2.5 text-sm font-medium text-muted-foreground data-[active=true]:text-foreground hover:bg-transparent space-x-1">
              <Link to="/dashboard" className="flex items-center space-x-2.5">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center rounded-sm">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-xl text-foreground">
                  <span className="truncate font-semibold">IrisBank</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarData.navMain} className="h-10 px-3 text-sm font-medium text-muted-foreground data-[active=true]:text-foreground"/>
      </SidebarContent>

      <SidebarFooter className="pb-6">
        <SidebarMenu className="space-y-2">

          {/* Bouton Paramètres */}
          <SidebarMenuItem className="px-1">
            <SidebarMenuButton
              asChild
              tooltip="Mon compte"
              className="h-10 px-6"
            >
              <NavLink to="/settings" className="space-x-2.5">
                <Settings className="size-4" />
                <span className="font-normal tracking-wide">Mon compte</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Bouton Déconnexion */}
          <SidebarMenuItem className="px-1">
            <SidebarMenuButton
              tooltip="Déconnexion"
              className="h-10 px-6 space-x-2.5 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
              <span className="font-normal tracking-wide">Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}