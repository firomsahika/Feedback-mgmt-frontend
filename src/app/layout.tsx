

import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ClientProviders from "@/components/clientProviders"; 
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased `}
      >
        <ClientProviders >
         <div className="flex flex-col w-full ">
           <Header />
          <div className="z-0 flex  h-[calc(100vh-4rem)]">
            <main className="bg-white w-full flex-1 ">
              {children}
              <Toaster />
            </main>
          </div>
         </div>
        </ClientProviders>
      </body>
    </html>
  );
}
