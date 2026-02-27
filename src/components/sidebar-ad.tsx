"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarAdProps {
  isCollapsed?: boolean;
}

export function SidebarAd({ isCollapsed = false }: SidebarAdProps) {
  const [isAdVisible, setIsAdVisible] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    const savedPreference = localStorage.getItem("sidebar-ad-visible");
    return savedPreference === null ? true : savedPreference === "true";
  });

  const toggleAdVisibility = () => {
    setIsAdVisible((previousVisibility) => {
      const nextVisibility = !previousVisibility;
      localStorage.setItem("sidebar-ad-visible", String(nextVisibility));
      return nextVisibility;
    });
  };

  if (isCollapsed) {
    return null;
  }

  return (
    <div className="mb-8 overflow-hidden" suppressHydrationWarning>
      {isAdVisible ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ad</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 hover:bg-accent"
              onClick={toggleAdVisibility}
              title="Hide ad"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <a
            href="https://pixalice.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-100 dark:shadow-none"
          >
            <div className="relative aspect-[1200/630] bg-neutral-200 dark:bg-neutral-800">
              <Image
                src="https://pixalice.com/og.png"
                alt="Pixalice AI Image & Video Generator Online"
                fill
                sizes="256px"
                className="object-contain p-1 dark:brightness-90"
              />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="truncate text-xs font-medium">Pixalice AI Image & Video Generator Online</h4>
                <ArrowUpRight className="h-3 w-3 flex-shrink-0 opacity-50" />
              </div>
            </div>
          </a>
        </>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-center gap-2"
          onClick={toggleAdVisibility}
        >
          <Eye className="h-3 w-3" />
          <span className="text-xs">Show Ad</span>
        </Button>
      )}
    </div>
  );
}
