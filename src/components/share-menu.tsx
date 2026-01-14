"use client";

import { useEffect, useRef, useState } from "react";
import { Share2 } from "lucide-react";

type ShareMenuProps = {
  canonicalUrl: string;
  shareText: string;
  className?: string;
};

export function ShareMenu({ canonicalUrl, shareText, className }: ShareMenuProps) {
  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedText = encodeURIComponent(shareText);
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
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
      <summary className="list-none inline-flex cursor-pointer items-center gap-2 rounded-full border border-transparent bg-neutral-100/50 px-3 py-1.5 text-xs font-medium text-neutral-600 transition hover:bg-neutral-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/60 [&::-webkit-details-marker]:hidden">
        <Share2 className="h-3.5 w-3.5" />
        <span>Share</span>
      </summary>
      <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-neutral-200/40 bg-neutral-100/70 p-1 text-sm shadow-md backdrop-blur">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-50"
        >
          Share on X
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-50"
        >
          Share on Facebook
        </a>
        <a
          href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`}
          target="_blank"
          rel="noreferrer"
          className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-50"
        >
          Share on Pinterest
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="block w-full rounded-lg px-3 py-2 text-left text-neutral-700 hover:bg-neutral-50"
        >
          {copied ? "Copied link" : "Copy Link"}
        </button>
      </div>
    </details>
  );
}
