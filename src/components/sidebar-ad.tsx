"use client";

import Image from "next/image";
import { useMemo, useSyncExternalStore } from "react";
import { ArrowUpRight, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import sidebarAdsData from "../../content/data/sidebar-ads.json";

interface SidebarAdProps {
  isCollapsed?: boolean;
}

interface SidebarAdItem {
  id: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  enabled: boolean;
}

// Keep ad inventory in content so new campaigns do not require component changes.
const sidebarAds = (sidebarAdsData.ads as SidebarAdItem[]).filter((ad) => ad.enabled);
const SIDEBAR_AD_VISIBLE_STORAGE_KEY = "sidebar-ad-visible";
const SIDEBAR_AD_VISIBLE_EVENT = "sidebar-ad-visible-change";

function subscribeToStoreChange(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => callback();
  window.addEventListener("storage", handleChange);
  window.addEventListener(SIDEBAR_AD_VISIBLE_EVENT, handleChange);

  // useSyncExternalStore expects an unsubscribe function; removing both listeners
  // here prevents orphaned subscriptions when the component unmounts.
  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(SIDEBAR_AD_VISIBLE_EVENT, handleChange);
  };
}

// We intentionally return a no-op unsubscribe here. The hook is only used to
// distinguish server render from hydrated client render, so no real subscription
// is needed and there is nothing to clean up.
function subscribeToHydration() {
  return () => {};
}

function getSidebarAdVisibilitySnapshot() {
  if (typeof window === "undefined") {
    return true;
  }

  const savedPreference = window.localStorage.getItem(SIDEBAR_AD_VISIBLE_STORAGE_KEY);
  return savedPreference === null ? true : savedPreference === "true";
}

function getRandomSidebarAd(): SidebarAdItem | null {
  if (sidebarAds.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * sidebarAds.length);
  return sidebarAds[randomIndex] ?? null;
}

export function SidebarAd({ isCollapsed = false }: SidebarAdProps) {
  const isHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const isAdVisible = useSyncExternalStore(subscribeToStoreChange, getSidebarAdVisibilitySnapshot, () => true);
  const currentAd = useMemo(() => {
    // Delay random selection until after hydration so the server and client do
    // not render different ad content on the first pass.
    if (!isHydrated) {
      return null;
    }

    return getRandomSidebarAd();
  }, [isHydrated]);

  const toggleAdVisibility = () => {
    const nextVisibility = !getSidebarAdVisibilitySnapshot();
    window.localStorage.setItem(SIDEBAR_AD_VISIBLE_STORAGE_KEY, String(nextVisibility));
    // localStorage "storage" events do not fire in the same tab that performed
    // the write, so dispatch a local event to keep this component in sync.
    window.dispatchEvent(new Event(SIDEBAR_AD_VISIBLE_EVENT));
  };

  if (isCollapsed || !isHydrated) {
    return null;
  }

  if (!currentAd) {
    return null;
  }

  return (
    <div className="mb-8 overflow-hidden">
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
            href={currentAd.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-100 dark:shadow-none"
          >
            <div className="relative aspect-[1200/630] bg-neutral-200 dark:bg-neutral-800">
              <Image
                src={currentAd.imageSrc}
                alt={currentAd.imageAlt}
                fill
                sizes="256px"
                className="object-contain p-1 dark:brightness-90"
              />
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <h4 className="truncate text-xs font-medium">{currentAd.title}</h4>
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
