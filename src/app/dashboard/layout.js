
import { cookies } from "next/headers";
import { SidebarProvider } from "../../components/ui/sidebar";
import AppSideBar from "../../components/AppSideBar";
import Navbar from "../../components/Navbar";

import React from 'react'

const Dashboardlayout = async ({children}) => {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSideBar />
        <main className='w-full bg-background lg:rounded-l-2xl lg:ml-5 lg:my-5'>
          <Navbar />
          <div className='px-4'>{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}

export default Dashboardlayout