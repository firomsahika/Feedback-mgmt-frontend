"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard , BookOpen , FileText, SlidersHorizontal ,Bell, Inbox  } from "lucide-react";


const items = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: LayoutDashboard , // Correctly imported and used
  },
  {
    title: "Classes",
    url: "/dashboard/admin/classes",
    icon: BookOpen , // Correctly imported and used
  },
  {
    title: "Subjects",
    url: "/dashboard/admin/subjects",
    icon: FileText, // Correctly imported and used
  },
  {
    title: "Parameters",
    url: "/dashboard/admin/parameters",
    icon: SlidersHorizontal , // Correctly imported and used
    badge: 2, // static count
  },
  {
    title: "Feedback",
    url: "/dashboard/admin/feedback",
    icon: Bell , // Correctly imported and used
    badge: 2, // static count
  },
  {
    title: "Submission Buffer",
    url: "/dashboard/admin/submission-buffer",
    icon: Inbox , // Correctly imported and used
  },
];

export function SideBar() {
  const pathname = usePathname();

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
