import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIP Calculator",
  description: "A powerful SIP & investment calculator to forecast future returns.",
  icons: {
    icon: "/cal.png",
    shortcut: "/cal.png",
    apple: "/cal.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head /> 
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
