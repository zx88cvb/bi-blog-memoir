import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function BlogPostPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl flex-1">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-neutral-200/50 px-4 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200 transition-colors"
          >
            Back
          </Link>

          <div className="inline-flex items-center justify-center rounded-full bg-neutral-200/50 px-4 py-1.5 text-xs font-medium text-neutral-600">
            Business • 2 min read
          </div>

          <Button variant="ghost" size="icon" className="rounded-full bg-neutral-200/50 hover:bg-neutral-200 h-8 w-8">
            <ChevronRight className="h-4 w-4 text-neutral-600" />
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-primary mb-6 leading-tight">
            The Truth About Sharing <br />
            My Earnings Online
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sharing your earnings and stats online can feel risky, but it&apos;s been a game-changer for
            my growth and trust with readers. Here&apos;s what I&apos;ve learned from being transparent.
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-200 mb-16">
          {/* Placeholder for featured image */}
          <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center text-neutral-500">
            Featured Image Placeholder
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none mb-20">
          <h2 className="text-2xl font-serif font-medium mb-4 mt-12">Why I Started Sharing My Numbers</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            At first, sharing my numbers felt strange. But I was tired of seeing creators hide behind
            vague claims or hype. I wanted to show what was real. Posting my subscriber counts,
            income, and failures forced me to get honest with myself and my readers. It was less
            about showing off and more about cutting through the noise.
          </p>

          <h2 className="text-2xl font-serif font-medium mb-4 mt-12">The Upsides and Downsides</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The upside? Trust. Readers know when you&apos;re telling the truth. When you post actual
            numbers, people listen. It&apos;s a shortcut to credibility. I&apos;ve had people tell me my
            transparency is why they subscribed or bought. The downside? People judge. You&apos;ll
            get advice you didn&apos;t ask for. Some months, you don&apos;t hit your targets and everyone
            sees it. It&apos;s not always comfortable, but it keeps you grounded.
          </p>

          <h2 className="text-2xl font-serif font-medium mb-4 mt-12">What I&apos;d Tell Anyone Considering It</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            If you&apos;re thinking about sharing your stats, don&apos;t do it for likes. Do it to help people see
            what&apos;s possible—and what isn&apos;t. Be clear, be consistent, and don&apos;t cherry-pick the
            good months. If you&apos;re willing to show your work, you&apos;ll stand out. People respect
            honesty. And you&apos;ll respect your own work more too.
          </p>
        </article>

        {/* Newsletter CTA */}
        {/* <div className="text-center py-12 border-t border-border">
          <h3 className="text-3xl font-serif font-medium mb-2">Be the first to know</h3>
          <h3 className="text-3xl font-serif font-medium mb-8">about every new letter.</h3>

          <div className="flex w-full max-w-md mx-auto items-center space-x-2 bg-neutral-100 p-1.5 rounded-lg">
            <Input
              type="email"
              placeholder="Your email"
              className="bg-transparent border-none shadow-none focus-visible:ring-0 h-10"
            />
            <Button className="h-10 px-6">Subscribe</Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No spam, unsubscribe anytime.
          </p>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
