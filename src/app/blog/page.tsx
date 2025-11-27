import { Footer } from "@/components/footer";

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl flex-1">
        <h1 className="text-4xl font-serif font-medium mb-8">Blog</h1>
        <p className="text-muted-foreground">All my thoughts and writings.</p>
        {/* List of blog posts would go here */}
      </div>
      <Footer />
    </div>
  );
}
