import { ChevronRight, type LucideIcon } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  items?: {
    title: string
    url: string
  }[]
}

type NavMainProps = {
  items: NavItem[]
  className?: string
}

export function NavMain({ items, className }: NavMainProps) {
  const { pathname } = useLocation()
  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(`${url}/`)

  return (
    <SidebarGroup className={className}>
      {/* <SidebarGroupLabel className="px-6">Platform</SidebarGroupLabel> */}
      <div className="my-2"></div>
      <SidebarMenu className="space-y-2">
        {items.map((item) => {
          const active = isActive(item.url)

          return (
            <Collapsible key={item.title} asChild open={active}>
              <SidebarMenuItem>
                {/* Item principal */}
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  data-active={active}
                  className="h-10 px-6"
                >
                  <NavLink to={item.url} end className="space-x-2">
                    <item.icon className="size-4" />
                    <span className="font-normal tracking-wide">{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>

                {/* Sous-menus */}
                {item.items && item.items.length > 0 && (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="transition-transform data-[state=open]:rotate-90">
                        <ChevronRight className="size-4" />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub >
                        {item.items.map((sub) => {
                          const subActive = isActive(sub.url)

                          return (
                            <SidebarMenuSubItem key={sub.title} >
                              <SidebarMenuSubButton
                                asChild
                                data-active={subActive}
                              >
                                <NavLink to={sub.url} className="flex items-center gap-3">
                                  <span>{sub.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
