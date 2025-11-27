import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
              Who&apos;s writing
            </div>

            <h1 className="text-5xl sm:text-6xl font-serif font-medium tracking-tight text-primary">
              Hey, I&apos;m Skylar.
            </h1>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a writer and digital creator sharing what I learn about building an
                independent career online. Most of what I publish comes from testing
                ideas, making mistakes, and finding what works—one project at a time.
              </p>
              <p>
                I started out writing as a side project, but after a few small wins (and a
                lot of failures), I turned it into my main thing. Now I focus on helping
                other creators do the same, without the hype or sugarcoating.
              </p>
            </div>

            <div className="pt-4">
              {/* Signature placeholder - using text for now, could be an image */}
              <div className="font-cursive text-4xl text-primary" style={{ fontFamily: 'cursive' }}>
                Skylar
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-200">
            {/* Placeholder for the profile image */}
            <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center text-neutral-500">
              Profile Image Placeholder
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
