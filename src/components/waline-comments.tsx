"use client";

import * as React from "react";
import { init } from "@waline/client";

type WalineCommentsProps = {
  path: string;
};

export function WalineComments({ path }: WalineCommentsProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const serverURL = process.env.NEXT_PUBLIC_WALINE_SERVER_URL;

  React.useEffect(() => {
    if (!containerRef.current || !serverURL) return;

    const waline = init({
      el: containerRef.current,
      serverURL,
      path,
      lang: "zh-CN",
      dark: false,
      login: "disable",
      imageUploader: false,
    });

    return () => waline?.destroy();
  }, [path, serverURL]);

  if (!serverURL) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-lg font-serif text-primary">Comments</h2>
      <div ref={containerRef} className="waline mt-6" />
    </section>
  );
}
