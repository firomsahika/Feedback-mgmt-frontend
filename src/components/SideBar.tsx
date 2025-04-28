"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Important! To get the current URL
import { Home, PenSquare, FileText, Bell, User } from "lucide-react"; // Correct icons!

const items = [
  {
    title: "Home",
    url: "/dashboard/student",
    icon: Home,
  },
  {
    title: "Submit Feedback",
    url: "/dashboard/student/submit-feedback",
    icon: PenSquare,
  },
  {
    title: "View My Feedback",
    url: "/dashboard/student/view-feedback",
    icon: FileText,
  },
  {
    title: "Notifications",
    url: "/dashboard/student/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    url: "/dashboard/student/profile",
    icon: User,
  },
];

export function SideBar() {
  const pathname = usePathname(); // Get the current path

  return (
    <aside className="h-full w-64 bg-[#E6E6E6] border-r shadow-sm">
     
      <nav className="flex flex-col  p-4 space-y-1 ">
        {items.map((item, index) => {
          const isActive = pathname === item.url; 

          return (
            <Link
              key={index}
              href={item.url}
              className={`flex items-center space-x-3 p-2 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
            >
              <item.icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-700"}`} />
              <span className="text-sm">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
