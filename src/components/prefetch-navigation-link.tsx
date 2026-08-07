"use client";

import type { ComponentProps, MouseEvent, ReactNode, TouchEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type PrefetchNavigationLinkProps = Omit<ComponentProps<typeof Link>, "children" | "href"> & {
  children: ReactNode;
  disabled?: boolean;
  href: string;
};

export function PrefetchNavigationLink({
  children,
  className,
  disabled = false,
  onClick,
  onMouseEnter,
  onTouchStart,
  href,
  ...props
}: PrefetchNavigationLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    onMouseEnter?.(event);
    if (!disabled && !event.defaultPrevented) router.prefetch(href);
  };

  const handleTouchStart = (event: TouchEvent<HTMLAnchorElement>) => {
    onTouchStart?.(event);
    if (!disabled && !event.defaultPrevented) router.prefetch(href);
  };

  return (
    <Link
      {...props}
      aria-disabled={disabled || undefined}
      className={cn("transition-colors", className)}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      prefetch={false}
      tabIndex={disabled ? -1 : undefined}
    >
      {children}
    </Link>
  );
}
