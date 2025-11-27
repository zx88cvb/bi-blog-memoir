"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User, ArrowUpRight, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Friendly Links", href: "/friends", icon: ArrowUpRight },
];

const socialLinks = [
  { name: "X (Twitter)", href: "https://x.com/HaydenBi", icon: Twitter },
  { name: "Email", href: "mailto:zx88cvb@gmail.com", icon: Mail },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background p-6 pt-20 animate-in slide-in-from-left-full duration-300">
          <nav className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 rounded-md px-4 py-3 text-lg font-medium transition-colors",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-6 w-6" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-12">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Find Me</h3>
            <div className="space-y-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-md px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="h-6 w-6" />
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
