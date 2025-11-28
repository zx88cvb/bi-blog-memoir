"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, User, Mail, Rss, Handshake, Lightbulb, ArrowUpRight, ChevronLeft, ChevronRight, X, Eye } from "lucide-react";
import { XIcon } from '@/components/ui/lucide-icon'
import Image from "next/image";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Product", href: "/product", icon: Lightbulb },
  { name: "Friendly Links", href: "/friends", icon: Handshake },
];

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const socialLinks = [
  { name: "X (Twitter)", href: "https://x.com/HaydenBi", icon: XIcon },
  { name: "Email", href: "mailto:zx88cvb@gmail.com", icon: Mail },
  baseUrl && { name: "RSS", href: `${baseUrl}/feed.xml`, icon: Rss },
].filter(Boolean) as { name: string; href: string; icon: typeof XIcon }[];

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ className, isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [isAdVisible, setIsAdVisible] = useState(true);

  // Hydrate client state after mount to prevent mismatch
  useEffect(() => {
    const savedPreference = localStorage.getItem('sidebar-ad-visible');
    if (savedPreference !== null) {
      // eslint-disable-next-line
      setIsAdVisible(savedPreference === 'true');
    }
  }, []);

  // Save ad visibility preference to localStorage
  const toggleAdVisibility = () => {
    const newVisibility = !isAdVisible;
    setIsAdVisible(newVisibility);
    localStorage.setItem('sidebar-ad-visible', String(newVisibility));
  };

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
        <div className="h-10 w-10 min-w-10 rounded-full overflow-hidden relative bg-neutral-200">
          <Image
            src="/logo.png"
            alt="Hayden Bi avatar"
            fill
            sizes="40px"
            className="object-cover"
            priority
          />
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
      <div className="mb-8 overflow-hidden whitespace-nowrap">
        {!isCollapsed && (
          <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Find Me</h3>
        )}
        <div className="space-y-1">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                  isCollapsed ? "justify-center" : "justify-between"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {!isCollapsed && item.name}
                </div>
                {!isCollapsed && <ArrowUpRight className="h-3 w-3 opacity-50" />}
              </a>
            );
          })}
        </div>
      </div>

      {/* Ad */}
      {!isCollapsed && (
        <div className="mb-8 overflow-hidden" suppressHydrationWarning>
          {isAdVisible ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ad</h3>
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
                href="https://x-twitter-downloader.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-neutral-200 relative">
                  <Image
                    src="https://r2.haydenbi.com/ad/og-image.png"
                    alt="Twitter Video Downloader"
                    fill
                    sizes="256px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-medium truncate">Twitter Video Downloader</h4>
                    <ArrowUpRight className="h-3 w-3 opacity-50 flex-shrink-0" />
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
