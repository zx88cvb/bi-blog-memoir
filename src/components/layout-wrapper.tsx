"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar
        className="hidden md:flex fixed inset-y-0 left-0 z-10 transition-all duration-300 ease-in-out"
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />
      <MobileNav />
      <main
        className={cn(
          "flex-1 w-full transition-all duration-300 ease-in-out",
          isCollapsed ? "md:pl-20" : "md:pl-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
