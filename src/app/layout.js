
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSideBar from "@/components/AppSideBar";
import Navbar from "@/components/Navbar";



export const metadata = {
  title: "Clrty",
  description: "No need to Imagine, Just Act",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <html lang='en' suppressHydrationWarning>
    <head>
    <link href="https://api.fontshare.com/v2/css?f[]=manrope@400,500,600&display=swap" rel="stylesheet"></link>
    </head>
      <body className={`font-manrope antialiased bg-sidebar`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSideBar />
            <main className='w-full bg-background lg:rounded-l-2xl lg:ml-5 lg:my-5'>
              <Navbar />
              <div className='px-4'>{children}</div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
       
      </body>
    </html>
  );
}
