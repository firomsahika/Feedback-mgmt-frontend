"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/userContext";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  SlidersHorizontal,
  Bell,
  Inbox,
  User,
  MessageCircle,
  Send,
} from "lucide-react";
import { useFeedbackStore } from "@/store/feedbackStore";

// Admin routes
const adminItems = [
  { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Classes", url: "/dashboard/admin/classes", icon: BookOpen },
  { title: "Subjects", url: "/dashboard/admin/subjects", icon: FileText },
  {
    title: "Parameters",
    url: "/dashboard/admin/parameters",
    icon: SlidersHorizontal,
  },
  { title: "Feedback", url: "/dashboard/admin/feedback", icon: Bell },
  {
    title: "Submission Buffer",
    url: "/dashboard/admin/submission-buffer",
    icon: Inbox,
  },
];

// Student routes
const studentItems = [
  { title: "Dashboard", url: "/dashboard/student", icon: LayoutDashboard },
  {
    title: "Submit Feedback",
    url: "/dashboard/student/submit-feedback",
    icon: Send,
  },
  {
    title: "View My Feedback",
    url: "/dashboard/student/view-feedback",
    icon: MessageCircle,
  },
  {
    title: "Notifications",
    url: "/dashboard/student/notifications",
    icon: Bell,
  },
  { title: "Profile", url: "/dashboard/student/profile", icon: User },
];

export function SideBar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { parameters, fetchData } = useFeedbackStore();

  useEffect(() => {
    fetchData(); // Fetch parameters on mount
  }, [fetchData]);

  const items = user?.role === "admin" ? adminItems : studentItems;

  return (
    <aside className="h-full w-64 bg-blue-500 border-r shadow-sm">
      <nav className="flex flex-col p-4 space-y-1">
        {items.map((item, index) => {
          const isActive = pathname === item.url;
          const showBadge =
            item.title === "Notifications" && parameters.length > 0;

          return (
            <Link
              key={index}
              href={item.url}
              className={`relative flex items-center space-x-3 p-2 rounded-md transition-colors ${
                isActive
                  ? "bg-slate-800 text-white shadow-2xl"
                  : "hover:bg-cyan-500 text-white"
              }`}
            >
              <div className="relative">
                <item.icon
                  className={`h-4 w-4 ${
                    isActive ? "text-white" : "text-gray-100"
                  }`}
                />
                {showBadge && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full h-4 w-4">
                    {parameters.length}
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
