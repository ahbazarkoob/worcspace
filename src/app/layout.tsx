import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import { SidebarProvider } from "@/components/ui/sidebar";

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Worcspace",
  description: "Manage and create knowledge articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased bg-background`}>
      <body className="h-screen flex flex-col overflow-hidden py-0.5 px-0.5 bg-background">
        <Header />
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex flex-1 overflow-hidden ">{children}</div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
