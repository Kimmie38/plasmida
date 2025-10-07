"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import ClientErrorHandler from "./ClientErrorHandler";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const showSidebar = pathname.toLowerCase().startsWith("/repository") || pathname.toLowerCase().startsWith("/upload");

  return (
    <div className="app-root min-h-screen flex">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 ${showSidebar ? 'ml-72' : ''}`}>{children}</main>
    </div>
  );
}
