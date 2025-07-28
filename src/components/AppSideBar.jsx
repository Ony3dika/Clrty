"use client";
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
import logo from "../../public/logo.png";
import {
  LayoutDashboard,
  ListTodo,
  Wallet,
  Settings,
  LogOut,
  ChartNoAxesColumnIncreasing,
  CalendarDays,
} from "lucide-react";
import { useStore } from "../app/store";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { toast } from "sonner";

const items = [
  { title: "Home", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Tasks", icon: ListTodo, url: "/dashboard/tasks" },
  { title: "Finance", icon: Wallet, url: "/dashboard/finance" },
  { title: "Calendar", icon: CalendarDays, url: "/dashboard/calendar" },
 
];
const AppSideBar = () => {
  const router = useRouter();

  const updateUser = useStore((state) => state.updateUser);
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
                <span className='text-xl font-medium font-chillax'>Clrty</span>
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
              <Link href={"/dashboard/settings"}>
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className={
                "hover:bg-red-500/30 hover:border-red-500 border border-transparent hover:border hover:text-red-500 cursor-pointer"
              }
              asChild
            >
              <button
                onClick={() => {
                  updateUser({
                    email: null,
                    first_name: null,
                    last_name: null,
                    avatar: null,
                  });

                  toast.success("Logged out successfully.");
                  setTimeout(() => {
                    router.push("/");
                  }, 2000);
                }}
                className='text-destructive'
              >
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
