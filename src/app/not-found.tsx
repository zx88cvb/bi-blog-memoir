import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f2f0]">
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-9xl font-medium text-primary/20 select-none">404</h1>
        <div className="space-y-6 relative -mt-12">
          <h2 className="font-serif text-4xl font-medium text-primary">Page not found</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
          </p>
          <Button asChild className="rounded-full px-8">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}