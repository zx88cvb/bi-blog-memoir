"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

export interface TOCItem {
  title: ReactNode;
  url: string;
  depth: number;
}

interface TOCProps {
  toc: TOCItem[];
}

export function TOC({ toc }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.url.slice(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  return (
    <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <h3 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        On this page
      </h3>
      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li key={item.url} style={{ paddingLeft: (item.depth - 2) * 16 }}>
            <a
              href={item.url}
              className={cn(
                "block transition-colors hover:text-neutral-900 dark:hover:text-neutral-100",
                activeId === item.url.slice(1)
                  ? "text-neutral-900 font-medium dark:text-neutral-100"
                  : "text-neutral-500 dark:text-neutral-400"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.url.slice(1))?.scrollIntoView({
                  behavior: "smooth",
                });
                setActiveId(item.url.slice(1));
                window.history.pushState(null, "", item.url);
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
