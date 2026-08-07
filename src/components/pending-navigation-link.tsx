"use client";

import type { ComponentProps, MouseEvent, ReactNode, TouchEvent } from "react";
import Link, { useLinkStatus } from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PendingNavigationLinkProps = Omit<ComponentProps<typeof Link>, "children" | "href"> & {
  children: ReactNode;
  disabled?: boolean;
  href: string;
};

export function PendingNavigationLink({
  children,
  className,
  disabled = false,
  onClick,
  onMouseEnter,
  onTouchStart,
  href,
  ...props
}: PendingNavigationLinkProps) {
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
      <PendingNavigationContent>{children}</PendingNavigationContent>
    </Link>
  );
}

function PendingNavigationContent({ children }: { children: ReactNode }) {
  const { pending } = useLinkStatus();

  const preventRepeatedNavigation = (event: MouseEvent<HTMLSpanElement>) => {
    if (pending) event.preventDefault();
  };

  return (
    <span
      aria-busy={pending || undefined}
      className="relative inline-flex items-center justify-center"
      data-pending={pending || undefined}
      onClick={preventRepeatedNavigation}
    >
      <span className={cn("transition-opacity", pending && "opacity-30")}>
        {children}
      </span>
      {pending && (
        <>
          <LoaderCircle aria-hidden="true" className="absolute h-4 w-4 animate-spin" />
          <span className="sr-only" role="status">
            Loading
          </span>
        </>
      )}
    </span>
  );
}
