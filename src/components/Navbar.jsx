import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import logo from "../../public/aski.png";
import Image from "next/image";
import ThemeToggle from "./comp-183";
import { Avatar,AvatarFallback, AvatarImage } from "./ui/avatar";
const Navbar = () => {
  return (
    <nav className='p-4 flex items-center justify-between'>
      <div className='flex items-center'>
        <SidebarTrigger />

        <h2 className='ml-4 text-xl font-semibold'>User</h2>
      </div>

      <div className='flex justify-between basis-1/4 items-center'>
        <h2 className='text-base font-medium'>
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>

        <ThemeToggle />

        <Avatar>
          <AvatarImage src={logo} />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
