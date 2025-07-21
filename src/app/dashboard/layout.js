import { cookies } from "next/headers";
import { SidebarProvider } from "../../components/ui/sidebar";
import AppSideBar from "../../components/appSideBar";
import Navbar from "../../components/navbar";
import { Toaster } from "sonner";

const Dashboardlayout = async ({ children }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSideBar />
        <main className='w-full bg-background lg:rounded-l-2xl lg:ml-5 lg:my-5'>
          <Navbar />
          <Toaster
            richColors
            theme='system'
            expand='boolean'
            closeButton
            position='top-right'
          />
          <div className='px-4'>{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default Dashboardlayout;
