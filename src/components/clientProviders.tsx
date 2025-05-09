"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/context/userContext";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </SidebarProvider>
  );
}
