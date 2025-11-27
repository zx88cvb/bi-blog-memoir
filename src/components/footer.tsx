import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("py-12 text-center text-sm text-muted-foreground", className)}>
      <div className="font-serif text-2xl text-primary mb-6">Memoir</div>
      <div className="flex justify-center gap-6 mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <Link href="/about" className="hover:text-primary">About</Link>
        <Link href="/friends" className="hover:text-primary">Friendly Links</Link>
      </div>
      <div className="text-xs">
        &copy; 2025 HaydenBi Blog. All rights reserved.
      </div>
    </footer>
  );
}
