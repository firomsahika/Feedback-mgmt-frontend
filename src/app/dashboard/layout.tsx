import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google"; // Import Poppins here
import { SideBar } from "@/components/SideBar";
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

          <div className="z-0 flex h-[calc(100vh-4rem)] ">

            <SideBar />
            <main className="bg-white w-full p-5 flex-1  overflow-y-auto">
              {children}
            </main>
          </div>
      </body>
    </html>
  );
}
