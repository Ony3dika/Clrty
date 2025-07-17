import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../components/ui/theme-provider";

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
    <html lang='en' suppressHydrationWarning>
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
