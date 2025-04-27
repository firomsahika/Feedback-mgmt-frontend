"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Important! To get the current URL
import { Home, PenSquare, FileText, Bell, User } from "lucide-react"; // Correct icons!

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Submit Feedback",
    url: "/submit-feedback",
    icon: PenSquare,
  },
  {
    title: "View My Feedback",
    url: "/view-feedback",
    icon: FileText,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function SideBar() {
  const pathname = usePathname(); // Get the current path

  return (
    <aside className="h-full w-64 bg-white border-r shadow-sm">
     
      <nav className="flex flex-col p-4 space-y-2">
        {items.map((item, index) => {
          const isActive = pathname === item.url; 

          return (
            <Link
              key={index}
              href={item.url}
              className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 text-gray-800"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-700"}`} />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
