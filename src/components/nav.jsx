"use client";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import logo from "../../public/clrty.png";
import ThemeToggle from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useStore } from "../app/store";
import { CircleUserRoundIcon } from "lucide-react";
const Navbar = () => {
  const user = useStore((state) => state.user);
  return (
    <nav className='p-4 flex items-center justify-between'>
      <div className='flex items-center'>
        <SidebarTrigger />

        {user.first_name ? (
          <h2 className='ml:4 md:block hidden text-base font-semibold'>Welcome, {user.first_name}</h2>
        ) : (
          <h2 className='ml:4 md:block hidden text-base font-semibold'>Welcome, User</h2>
        )}
      </div>

      <div className='flex justify-between basis-4/5 md:basis-1/4 items-center'>
        <h2 className='md:text-base text-sm font-medium'>
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>

        <ThemeToggle />

        
          <CircleUserRoundIcon className="opacity-60"/>
          
        
      </div>
    </nav>
  );
};

export default Navbar;
