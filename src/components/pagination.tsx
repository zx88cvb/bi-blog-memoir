import Link from "next/link";
import { cn } from "@/lib/utils";
import { softSurface, softSurfaceHover } from "@/lib/ui-classes";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
  className?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  buildHref,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  return (
    <div className={cn("mt-10 flex flex-wrap items-center justify-center gap-2", className)}>
      <Link
        href={buildHref(prevPage)}
        aria-disabled={currentPage === 1}
        className={cn(
          "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all",
          currentPage === 1
            ? "cursor-not-allowed text-neutral-400 border-neutral-200 dark:border-neutral-800"
            : cn(softSurface, softSurfaceHover, "text-neutral-700 dark:text-neutral-200")
        )}
      >
        Prev
      </Link>
      {pages.map((page) => {
        const active = page === currentPage;
        return (
          <Link
            key={page}
            href={buildHref(page)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all",
              active
                ? "bg-black text-white border-black shadow-sm dark:bg-neutral-700 dark:text-neutral-100 dark:border-neutral-600 dark:shadow-none"
                : cn(softSurface, softSurfaceHover, "text-neutral-700 dark:text-neutral-200")
            )}
          >
            {page}
          </Link>
        );
      })}
      <Link
        href={buildHref(nextPage)}
        aria-disabled={currentPage === totalPages}
        className={cn(
          "inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all",
          currentPage === totalPages
            ? "cursor-not-allowed text-neutral-400 border-neutral-200 dark:border-neutral-800"
            : cn(softSurface, softSurfaceHover, "text-neutral-700 dark:text-neutral-200")
        )}
      >
        Next
      </Link>
    </div>
  );
}
