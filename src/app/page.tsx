import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm">
          From the desk of Skylar
        </div>
        <h1 className="max-w-3xl text-5xl font-serif font-medium tracking-tight text-primary sm:text-6xl mb-8">
          Ideas and insights for <br className="hidden sm:block" />
          the <span className="italic font-serif">modern</span> creator.
        </h1>
        {/* <div className="flex w-full max-w-md items-center space-x-2">
          <Input type="email" placeholder="Your email" className="bg-white" />
          <Button>Subscribe</Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          No spam, unsubscribe anytime.
        </p> */}
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
            <Button variant="secondary" size="sm" className="rounded-full px-4 bg-white text-black shadow-sm hover:bg-neutral-50">
              All
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full px-4 bg-neutral-100/50 text-neutral-600 hover:bg-neutral-200/50">
              Audience
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full px-4 bg-neutral-100/50 text-neutral-600 hover:bg-neutral-200/50">
              Writing
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full px-4 bg-neutral-100/50 text-neutral-600 hover:bg-neutral-200/50">
              Business
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full px-4 bg-neutral-100/50 text-neutral-600 hover:bg-neutral-200/50">
              Mindset
            </Button>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="w-full rounded-lg bg-white pl-9 border-none shadow-sm"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Post 1 */}
          <Link href="/posts/the-truth-about-sharing-my-earnings-online" className="group block bg-white rounded-2xl p-2 shadow-sm hover:shadow-md transition-all">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200 relative mb-4">
              {/* Image placeholder */}
              <div className="absolute inset-0 bg-orange-900/20" />
            </div>
            <div className="px-2 pb-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold leading-tight tracking-tight text-primary">
                  The Truth About Sharing My Earnings Online
                </h3>
                <div className="rounded-full bg-neutral-100 p-1 group-hover:bg-neutral-200 transition-colors">
                  <ArrowRight className="h-4 w-4 text-neutral-500" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <span>Business</span>
                <span>•</span>
                <span>5 min</span>
              </div>
            </div>
          </Link>

          {/* Post 2 */}
          <div className="group block bg-white rounded-2xl p-2 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200 relative mb-4">
              {/* Image placeholder */}
              <div className="absolute inset-0 bg-neutral-100" />
            </div>
            <div className="px-2 pb-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold leading-tight tracking-tight text-primary">
                  How I Turned a Hobby Into Real Income
                </h3>
                <div className="rounded-full bg-neutral-100 p-1 group-hover:bg-neutral-200 transition-colors">
                  <ArrowUpRight className="h-4 w-4 text-neutral-500" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <span>Business</span>
                <span>•</span>
                <span>4 min</span>
              </div>
            </div>
          </div>

          {/* Post 3 */}
          <div className="group block bg-white rounded-2xl p-2 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200 relative mb-4">
              {/* Image placeholder */}
              <div className="absolute inset-0 bg-stone-100" />
            </div>
            <div className="px-2 pb-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold leading-tight tracking-tight text-primary">
                  The Unsexy Truth About Consistent Content
                </h3>
                <div className="rounded-full bg-neutral-100 p-1 group-hover:bg-neutral-200 transition-colors">
                  <ArrowUpRight className="h-4 w-4 text-neutral-500" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <span>Mindset</span>
                <span>•</span>
                <span>4 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      {/* <section className="bg-white py-24 px-4 text-center">
        <div className="mb-6 inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
          My mission is to
        </div>
        <h2 className="mx-auto max-w-2xl text-4xl font-serif font-medium tracking-tight text-primary sm:text-5xl mb-8">
          Help you create and <br />
          earn on <span className="italic font-serif">your</span> terms.
        </h2>
        <div className="mx-auto flex w-full max-w-md items-center space-x-2 bg-neutral-50 p-2 rounded-lg">
          <Input type="email" placeholder="Your email" className="bg-transparent border-none shadow-none focus-visible:ring-0" />
          <Button>Subscribe</Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          No spam, unsubscribe anytime.
        </p>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
