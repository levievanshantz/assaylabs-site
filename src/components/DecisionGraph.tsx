"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import graphData from "../../public/decision-graph.json";

type Mode = "geography" | "graph";

interface RawNode {
  id: string;
  title: string;
  kind: string;
  status: string;
  captured_at: string | null;
  source_agent: string | null;
  has_embedding: boolean;
  x: number;
  y: number;
  cluster: number;
}
interface RawLink {
  source: string;
  target: string;
  type: string;
  reason: string | null;
  drift: number | null;
}

// Cluster palette — eight buckets keyed to the export script's coarseCluster()
// plus -1 for embedding-less stragglers. Tuned to read on a near-black bg.
const CLUSTER_COLORS = [
  "hsl(234 100% 71%)", // brand indigo (inner ring, wedge 0)
  "hsl(180 70% 60%)", // teal
  "hsl(152 60% 55%)", // green
  "hsl(38 92% 60%)", // amber
  "hsl(280 70% 70%)", // violet (outer ring start)
  "hsl(330 75% 68%)", // rose
  "hsl(15 85% 65%)", // coral
  "hsl(54 80% 65%)", // yellow
];
const STRAGGLER_COLOR = "hsl(220 10% 35%)";

function clusterColor(c: number): string {
  if (c < 0 || c >= CLUSTER_COLORS.length) return STRAGGLER_COLOR;
  return CLUSTER_COLORS[c];
}

const STATUS_COLOR: Record<string, string> = {
  candidate: "hsl(220 30% 78%)",
  reviewed: "hsl(180 70% 60%)",
  promoted: "hsl(152 60% 55%)",
  superseded: "hsl(354 75% 65%)",
  rejected: "hsl(220 10% 35%)",
};

export default function DecisionGraph() {
  const [mode, setMode] = useState<Mode>("geography");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selected, setSelected] = useState<RawNode | null>(null);
  const [dims, setDims] = useState({ w: 800, h: 560 });
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);

  const data = graphData as {
    generated_at: string;
    stats: {
      decisions: number;
      edges: number;
      kinds: Record<string, number>;
      statuses: Record<string, number>;
      detection_methods: Record<string, number>;
    };
    nodes: RawNode[];
    links: RawLink[];
  };

  // react-force-graph mutates node objects (adds vx/vy/x/y) so we deep-clone
  // each time mode changes. We also store both pinned (geography) and free
  // (graph) coordinate sets so toggling doesn't lose UMAP positions.
  const graphPayload = useMemo(() => {
    const scale = 6; // box ≈ 600 units across
    const nodes = data.nodes.map((n) => {
      if (mode === "geography") {
        return {
          ...n,
          x: (n.x - 50) * scale,
          y: (n.y - 50) * scale,
          fx: (n.x - 50) * scale,
          fy: (n.y - 50) * scale,
        };
      }
      return { ...n, fx: undefined, fy: undefined };
    });
    const links = data.links.map((l) => ({ ...l }));
    return { nodes, links };
  }, [data, mode]);

  useEffect(() => {
    function onResize() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDims({
        w: Math.max(320, Math.floor(rect.width)),
        h: Math.max(420, Math.min(720, Math.floor(rect.width * 0.62))),
      });
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Re-zoom-to-fit whenever mode flips so the viewport reframes.
  useEffect(() => {
    const id = setTimeout(() => {
      fgRef.current?.zoomToFit(400, 40);
    }, 100);
    return () => clearTimeout(id);
  }, [mode, dims.w]);

  return (
    <div className="w-full">
      {/* ──────────── header / toggle ──────────── */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-[hsl(220,10%,55%)]">
          <span className="text-[hsl(220,15%,93%)] font-medium tabular-nums">
            {data.stats.decisions}
          </span>{" "}
          decisions ·{" "}
          <span className="tabular-nums">{data.stats.edges}</span> supersession
          edges · generated{" "}
          {new Date(data.generated_at).toLocaleDateString()}
        </div>
        <div className="inline-flex rounded-full border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-0.5 text-xs">
          {(["geography", "graph"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3.5 py-1.5 font-medium transition-colors ${
                mode === m
                  ? "bg-[hsl(234,100%,71%)] text-white"
                  : "text-[hsl(220,10%,55%)] hover:text-[hsl(220,15%,93%)]"
              }`}
            >
              {m === "geography" ? "Geography" : "Graph"}
            </button>
          ))}
        </div>
      </div>

      {/* ──────────── caption ──────────── */}
      <p className="mb-3 text-xs text-[hsl(220,10%,55%)] leading-relaxed">
        {mode === "geography" ? (
          <>
            <span className="text-[hsl(220,15%,93%)]">Geography view.</span>{" "}
            Each dot is a decision; nearness = semantic similarity. UMAP
            projection of the 1024-dim embedding. Color = cluster region.
          </>
        ) : (
          <>
            <span className="text-[hsl(220,15%,93%)]">Graph view.</span>{" "}
            Force-directed layout. Edges are supersessions: when one decision
            replaces another. Color = status.
          </>
        )}
      </p>

      {/* ──────────── canvas ──────────── */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl border border-[hsl(220,15%,18%)] bg-[hsl(220,18%,5%)]"
        style={{ height: dims.h }}
      >
        <ForceGraph2D
          ref={fgRef}
          graphData={graphPayload}
          width={dims.w}
          height={dims.h}
          backgroundColor="transparent"
          nodeRelSize={3}
          cooldownTime={mode === "graph" ? 4000 : 0}
          enableNodeDrag={mode === "graph"}
          warmupTicks={mode === "graph" ? 80 : 0}
          d3AlphaDecay={mode === "graph" ? 0.02 : 1}
          d3VelocityDecay={0.35}
          linkColor={() => "rgba(245,158,50,0.55)"}
          linkWidth={1.4}
          linkDirectionalArrowLength={mode === "graph" ? 4 : 0}
          linkDirectionalArrowRelPos={0.95}
          linkDirectionalArrowColor={() => "rgba(245,158,50,0.85)"}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const n = node as unknown as RawNode & { x: number; y: number };
            const isHover = hoverId === n.id;
            const isSel = selected?.id === n.id;
            const baseR = mode === "graph" ? 4.2 : 3.4;
            const r = isHover || isSel ? baseR + 1.6 : baseR;
            const fill =
              mode === "geography"
                ? clusterColor(n.cluster)
                : STATUS_COLOR[n.status] || "hsl(220 15% 70%)";

            ctx.beginPath();
            ctx.arc(n.x, n.y, r, 0, 2 * Math.PI);
            ctx.fillStyle = fill;
            ctx.globalAlpha = isHover || isSel || !hoverId ? 1 : 0.4;
            ctx.fill();
            if (isHover || isSel) {
              ctx.lineWidth = 1.5 / globalScale;
              ctx.strokeStyle = "rgba(255,255,255,0.85)";
              ctx.stroke();
            }
            ctx.globalAlpha = 1;

            // Label only on hover/selection — at any scale.
            if (isHover || isSel) {
              const label =
                n.title.length > 64 ? n.title.slice(0, 61) + "…" : n.title;
              ctx.font = `${12 / globalScale}px Inter, system-ui`;
              ctx.fillStyle = "rgba(0,0,0,0.78)";
              const padX = 5 / globalScale;
              const padY = 3 / globalScale;
              const w = ctx.measureText(label).width + padX * 2;
              const h = 14 / globalScale + padY * 2;
              ctx.fillRect(n.x + r + 2, n.y - h / 2, w, h);
              ctx.fillStyle = "rgba(255,255,255,0.95)";
              ctx.textBaseline = "middle";
              ctx.fillText(label, n.x + r + 2 + padX, n.y);
            }
          }}
          onNodeHover={(node) =>
            setHoverId((node as unknown as RawNode | null)?.id || null)
          }
          onNodeClick={(node) => setSelected(node as unknown as RawNode)}
          onBackgroundClick={() => setSelected(null)}
        />

        {/* legend */}
        <div className="pointer-events-none absolute bottom-3 left-3 text-[10px] text-[hsl(220,10%,60%)] leading-relaxed">
          {mode === "geography" ? (
            <div>
              <div className="mb-0.5 font-semibold uppercase tracking-wider text-[hsl(220,15%,75%)]">
                Cluster
              </div>
              <div className="flex flex-wrap gap-2">
                {CLUSTER_COLORS.map((c, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: c }}
                    />
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-0.5 font-semibold uppercase tracking-wider text-[hsl(220,15%,75%)]">
                Status
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(STATUS_COLOR).map(([s, c]) => (
                  <span key={s} className="flex items-center gap-1">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: c }}
                    />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ──────────── side panel for selected ──────────── */}
      {selected && (
        <div className="mt-4 rounded-xl border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-4 text-sm">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{
                  background:
                    mode === "geography"
                      ? clusterColor(selected.cluster)
                      : STATUS_COLOR[selected.status] || "hsl(220 15% 70%)",
                }}
              />
              <span className="text-xs uppercase tracking-wider text-[hsl(220,10%,55%)]">
                {selected.kind} · {selected.status}
                {selected.captured_at &&
                  ` · ${new Date(selected.captured_at).toLocaleDateString()}`}
              </span>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-xs text-[hsl(220,10%,55%)] hover:text-[hsl(220,15%,93%)]"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-[hsl(220,15%,93%)] leading-relaxed">
            {selected.title}
          </p>
          {selected.source_agent && (
            <p className="mt-2 text-[11px] text-[hsl(220,10%,55%)] font-mono">
              source_agent: {selected.source_agent}
            </p>
          )}
          <p className="mt-2 font-mono text-[10px] text-[hsl(220,10%,40%)]">
            {selected.id}
          </p>
        </div>
      )}
    </div>
  );
}
