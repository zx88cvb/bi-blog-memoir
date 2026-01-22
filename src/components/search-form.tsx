"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { softSurface, softSurfaceHover } from "@/lib/ui-classes";

type SearchFormProps = {
  selectedCategory?: string;
  query: string;
};

export function SearchForm({ selectedCategory, query }: SearchFormProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("q") as string;
    
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (searchQuery?.trim()) params.set("q", searchQuery.trim());
    
    const search = params.toString();
    const href = search ? `/?${search}` : "/";
    
    startTransition(() => {
      router.push(href, { scroll: false });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        name="q"
        placeholder="Search..."
        defaultValue={query}
        className={cn(
          "w-64 rounded-full pl-9 shadow-none transition-all text-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-500",
          softSurface,
          softSurfaceHover,
          "focus-visible:ring-1 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-600"
        )}
      />
    </form>
  );
}
