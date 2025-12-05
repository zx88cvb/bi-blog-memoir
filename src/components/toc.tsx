"use client";

import { useEffect, useMemo, useState } from "react";
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

type TOCTreeItem = TOCItem & { children: TOCTreeItem[] };

function buildTree(items: TOCItem[]): TOCTreeItem[] {
  if (!items.length) return [];

  const tree: TOCTreeItem[] = [];
  const stack: TOCTreeItem[] = [];

  items.forEach((item) => {
    const node: TOCTreeItem = { ...item, children: [] };

    while (stack.length && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  });

  return tree;
}

export function TOC({ toc }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const tocTree = useMemo(() => buildTree(toc), [toc]);

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

  if (!tocTree || tocTree.length === 0) return null;

  const renderItems = (items: TOCTreeItem[], level = 0) => (
    <ul
      className={cn(
        "space-y-2",
        level > 0 && "mt-2 border-l border-neutral-200 pl-3 dark:border-neutral-800"
      )}
    >
      {items.map((item) => (
        <li key={item.url} className="space-y-2">
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
          {item.children.length ? renderItems(item.children, level + 1) : null}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <h3 className="mb-4 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        On this page
      </h3>
      <div className="text-sm">{renderItems(tocTree)}</div>
    </div>
  );
}
