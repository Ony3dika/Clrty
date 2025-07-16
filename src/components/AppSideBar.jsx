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
  Users2Icon,
} from "lucide-react";

import Image from "next/image";

const items = [
  { title: "Home", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Tasks", icon: ListTodo, url: "/dashboard/tasks" },
  { title: "Team", icon: Users2Icon, url: "/dashboard/team" },
  { title: "Finance", icon: Wallet, url: "/dashboard/finance" },

  { title: "Calendar", icon: Calendar, url: "/dashboard/calendar" },

  {
    title: "Analytics",
    icon: ChartNoAxesColumnIncreasing,
    url: "/dashboard/analytics",
  },
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
                <span className="text-xl font-medium font-chillax">Clrty</span>
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
