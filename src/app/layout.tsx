import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import  {SideBar}  from "@/components/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Feedback Management",
  description: "University feedback dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider className="flex flex-col h-screen bg-[E6E6E6]">
          {/* Top Header */}
          <Header />

          {/* Sidebar + Main content */}
          <div className="z-0 flex h-[calc(100vh-4rem)]"> {/* 4rem = 64px (h-16) */}
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <main className="bg-white w-full flex-1 p-6 overflow-y-auto ">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
