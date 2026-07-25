import { getLlmsText } from "@/lib/llms";

export const revalidate = false;

export function GET() {
  return new Response(getLlmsText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
