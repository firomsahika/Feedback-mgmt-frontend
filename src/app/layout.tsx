import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google"; // Import Poppins here
import "./globals.css";
import Header from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

// Load fonts
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased`}
      >
        <SidebarProvider className="flex flex-col ">

          <Header />

          <div className="z-0 flex h-[calc(100vh-4rem)]">

            <main className="bg-white w-full flex-1 p-6 ">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
