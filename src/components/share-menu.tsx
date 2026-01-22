"use client";

import { useEffect, useRef, useState } from "react";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { softSurface, softSurfaceHover } from "@/lib/ui-classes";

type ShareMenuProps = {
  canonicalUrl: string;
  shareText: string;
  className?: string;
};

export function ShareMenu({ canonicalUrl, shareText, className }: ShareMenuProps) {
  // Pre-encode for share URLs.
  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedText = encodeURIComponent(shareText);
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Close the dropdown on outside click or Escape.
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const details = detailsRef.current;
      if (!details) return;
      if (!details.open) return;
      if (event.target instanceof Node && details.contains(event.target)) return;
      details.open = false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const details = detailsRef.current;
      if (!details?.open) return;
      if (event.key === "Escape") {
        details.open = false;
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCopy = async () => {
    // Prefer Clipboard API, fallback to a hidden textarea when unavailable.
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(canonicalUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = canonicalUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <details ref={detailsRef} className={className}>
      <summary
        className={cn(
          "list-none inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/60 dark:text-neutral-300 dark:focus-visible:ring-neutral-600/60 [&::-webkit-details-marker]:hidden",
          softSurface,
          softSurfaceHover
        )}
      >
        <Share2 className="h-3.5 w-3.5" />
        <span>Share</span>
      </summary>
      <div
        className={cn(
          "absolute right-0 z-50 mt-2 w-52 rounded-xl p-1 text-sm shadow-md backdrop-blur",
          softSurface
        )}
      >
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800/70"
        >
          Share on X
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800/70"
        >
          Share on Facebook
        </a>
        <a
          href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800/70"
        >
          Share on Pinterest
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="block w-full rounded-lg px-3 py-2 text-left text-neutral-700 hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800/70"
        >
          {copied ? "Copied link" : "Copy Link"}
        </button>
      </div>
    </details>
  );
}
