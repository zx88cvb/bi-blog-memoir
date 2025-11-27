"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, User, Twitter, Mail, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Friendly Links", href: "/friends", icon: ArrowUpRight },
];

const socialLinks = [
  { name: "X (Twitter)", href: "https://x.com/HaydenBi", icon: Twitter },
  { name: "Email", href: "mailto:zx88cvb@gmail.com", icon: Mail },
];

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ className, isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col bg-sidebar text-sidebar-foreground border-r border-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20 p-4" : "w-64 p-6",
        className
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-border bg-background shadow-sm z-50 hidden md:flex"
        onClick={onToggle}
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {/* Profile */}
      <div className={cn("flex items-center gap-3 mb-8 transition-all", isCollapsed ? "justify-center" : "")}>
        <div className="h-10 w-10 min-w-10 rounded-full bg-gray-300 overflow-hidden relative">
          {/* Placeholder for profile image */}
          <div className="absolute inset-0 bg-neutral-400" />
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden whitespace-nowrap">
            <h2 className="font-semibold text-sm">Hayden Bi</h2>
            <p className="text-xs text-muted-foreground">Coffee & Indie Developer</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-1 mb-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                isCollapsed ? "justify-center px-2" : "justify-between px-3"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Find Me */}
      {!isCollapsed && (
        <div className="mb-8 overflow-hidden whitespace-nowrap">
          <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Find Me</h3>
          <div className="space-y-1">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </div>
                  <ArrowUpRight className="h-3 w-3 opacity-50" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Ad */}
      {!isCollapsed && (
        <div className="mb-8 overflow-hidden">
          <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Ad</h3>
          <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="h-32 bg-neutral-200 relative">
              {/* Placeholder for Ad image */}
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium truncate">The Only Writing Tools I Actually Use</h4>
                <ArrowUpRight className="h-3 w-3 opacity-50 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter */}
      {/* {!isCollapsed && (
        <div className="mt-auto overflow-hidden">
          <h3 className="text-sm font-medium mb-2">Stay in the loop</h3>
          <div className="space-y-2">
            <Input placeholder="Your email" className="bg-background" />
            <Button className="w-full justify-center">Subscribe</Button>
          </div>
        </div>
      )} */}
    </aside>
  );
}
