"use client";

import dynamic from "next/dynamic";

const KnowledgeGraph = dynamic(() => import("./KnowledgeGraph"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-lg border border-border bg-[hsl(220,18%,8%)]">
      <p className="text-sm text-muted-foreground">Loading graph&hellip;</p>
    </div>
  ),
});

export function KnowledgeGraphSection() {
  return <KnowledgeGraph />;
}
