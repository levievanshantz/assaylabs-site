"use client";

import dynamic from "next/dynamic";

const DecisionGraph = dynamic(() => import("./DecisionGraph"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[560px] items-center justify-center rounded-xl border border-[hsl(220,15%,18%)] bg-[hsl(220,18%,5%)]">
      <p className="text-sm text-[hsl(220,10%,55%)]">Loading graph…</p>
    </div>
  ),
});

export function DecisionGraphContainer() {
  return <DecisionGraph />;
}
