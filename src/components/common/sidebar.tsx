"use client";

import { Home, LogIn } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";
const users = {
  group: "user",
  list: [
    { title: "Login", url: "/login", icon: LogIn },
    { title: "Home", url: "/", icon: Home },
    { title: "Kanban", url: "/kanban", icon: Home },
  ],
};

export default function AppSidebar() {
  return (
    <Sidebar className="bg-white">
      <SidebarHeader className="font-bold">SK MEMO</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* users */}
          <SidebarGroupLabel>{users.group}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {users.list.map((menu, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSubButton asChild>
                    <a href={menu.url}>
                      <menu.icon />
                      <span>{menu.title}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
