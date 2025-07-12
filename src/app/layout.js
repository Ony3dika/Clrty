import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";

export const metadata = {
  title: "Clrty",
  description: "No need to Imagine, Just Act",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link
          href='https://api.fontshare.com/v2/css?f[]=manrope@400,500,600&display=swap'
          rel='stylesheet'
        ></link>
      </head>
      <body className={`font-manrope antialiased bg-sidebar`}>
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
