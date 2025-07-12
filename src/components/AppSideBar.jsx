import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import logo from "../../public/aski.png";
import {
  LayoutDashboard,
  ListTodo,
  Wallet,
  Calendar,
  Settings,
  PersonStanding,
  LogOut,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

import Image from "next/image";

const items = [
  { title: "Home", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Tasks", icon: ListTodo, url: "/dashboard/tasks" },
  { title: "Finance", icon: Wallet, url: "/dashboard/finance" },
  {
    title: "Analytics",
    icon: ChartNoAxesColumnIncreasing,
    url: "/dashboard/analytics",
  },
  { title: "Calendar", icon: Calendar, url: "/dashboard/calendar" },
  { title: "Habits", icon: PersonStanding, url: "/dashboard/habits" },
];
const AppSideBar = () => {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className={"py-8"}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className={"py-5"} asChild>
              <Link href='/'>
                <Image
                  src={logo}
                  alt='Clrty'
                  className='rounded-full'
                  width={40}
                  height={40}
                />
                <span>Clrty</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            {" "}
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title == "Inbox" && (
                    <SidebarMenuBadge className='bg-sidebar-foreground text-primary'>
                      5
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        {" "}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={"/"}>
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className='text-destructive '>
                {" "}
                <LogOut />
                <span>LogOut</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
