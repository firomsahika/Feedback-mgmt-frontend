"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/userContext";
import { LayoutDashboard , BookOpen , FileText, SlidersHorizontal ,Bell, Inbox, User, MessageCircle  } from "lucide-react";


// Admin routes
const adminItems = [
  { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Classes", url: "/dashboard/admin/classes", icon: BookOpen },
  { title: "Subjects", url: "/dashboard/admin/subjects", icon: FileText },
  { title: "Parameters", url: "/dashboard/admin/parameters", icon: SlidersHorizontal, badge: 2 },
  { title: "Feedback", url: "/dashboard/admin/feedback", icon: Bell, badge: 2 },
  { title: "Submission Buffer", url: "/dashboard/admin/submission-buffer", icon: Inbox },
];

// Student routes
const studentItems = [
  { title: "Dashboard", url: "/dashboard/student", icon: LayoutDashboard },
  { title: "Profile", url: "/dashboard/student/profile", icon: User },
  { title: "View Feedback", url: "/dashboard/student/feedback", icon: MessageCircle },
];

export function SideBar() {
  const pathname = usePathname();
  const {user} = useUser()

  const items = user?.role === "admin" ? adminItems : studentItems;

  return (
    <aside className="h-full w-64 bg-slate-700 border-r shadow-sm  pt-5">
      <nav className="flex flex-col p-4 space-y-1">
        {items.map((item, index) => {
          const isActive = pathname === item.url;

          return (
            <Link
              key={index}
              href={item.url}
              className={`relative flex items-center space-x-3 p-2 rounded-md transition-colors ${
                isActive
                  ? "bg-cyan-500 text-white shadow-2xl"
                  : "hover:bg-slate-800 text-white"
              }`}
            >
              <div className="relative">
                <item.icon
                  className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-100"}`}
                />
                {item.title === "Notifications" && item.badge && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full h-4 w-4">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-sm">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
