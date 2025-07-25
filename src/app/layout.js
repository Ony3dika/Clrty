import "./globals.css";
import { Geist} from "next/font/google";
import { ThemeProvider } from "../components/ui/theme-provider";
import {TanstackProvider} from "../components/providers/tanstack-provider"
import { Toaster } from "sonner";
export const metadata = {
  title: "Clrty",
  description: "Workflows that work.",
};
const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <head>
        <link
          href='https://api.fontshare.com/v2/css?f[]=manrope@400,500,600&display=swap'
          rel='stylesheet'
        ></link>
        <link
          href='https://api.fontshare.com/v2/css?f[]=chillax@400,500,600&display=swap'
          rel='stylesheet'
        ></link>
      </head>
      <body
        className={`font-manrope ${fontSans.variable} antialiased bg-sidebar`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            <Toaster
              richColors
              theme='system'
              closeButton
              position='top-right'
            />
            {children}
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
