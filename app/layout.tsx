import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppSideBar from "@/components/app-side-bar";
import NavBar from "@/components/nav-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shadcn Admin Panel",
  description: "Admin panel created using Shadcn",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSideBar />
              <main className="w-full">
                <NavBar />
                <div className="px-4">{children}</div>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
    // <html lang="en">
    //   <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    // </html>
  );
}
