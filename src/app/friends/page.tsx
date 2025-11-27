import { Footer } from "@/components/footer";

export default function FriendlyLinksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-3xl flex-1">
        <h1 className="text-4xl font-serif font-medium mb-8">Friendly Links</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Example Link Card */}
          <a href="#" className="block p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Example Friend</h3>
            <p className="text-sm text-muted-foreground">A cool blog about something interesting.</p>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
