"use client";

import { useState } from "react";
import graphData from "./knowledge-graph-data.json";

/*
 * Static SVG knowledge graph — no physics, no jitter.
 * Pre-computed positions arranged in a circle.
 * Toggle shows RAG-only vs RAG+Claims side by side.
 */

interface NodeData {
  id: string;
  label: string;
  type: string;
  claims: number;
  x: number;
  y: number;
}

const W = 520;
const H = 420;
const CX = W / 2;
const CY = H / 2;
const R = 160; // ring radius

// Pre-compute node positions in a circle
const nodes: NodeData[] = graphData.nodes.map((n, i) => {
  const angle = (i / graphData.nodes.length) * Math.PI * 2 - Math.PI / 2;
  return {
    id: n.id,
    label: n.label,
    type: n.type,
    claims: n.claims,
    x: CX + Math.cos(angle) * R,
    y: CY + Math.sin(angle) * R,
  };
});

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

const ragEdges = (graphData.ragEdges || [])
  .map((e) => ({
    source: nodeMap.get(e.source),
    target: nodeMap.get(e.target),
    sim: e.similarity,
  }))
  .filter((e) => e.source && e.target) as {
  source: NodeData;
  target: NodeData;
  sim: number;
}[];

const claimsEdges = (graphData.claimsEdges || [])
  .map((e) => ({
    source: nodeMap.get(e.source),
    target: nodeMap.get(e.target),
    lift: e.lift,
    claim: e.claim,
  }))
  .filter((e) => e.source && e.target) as {
  source: NodeData;
  target: NodeData;
  lift: number;
  claim: string;
}[];

// Nodes that participate in claims edges
const claimsNodeIds = new Set<string>();
for (const e of claimsEdges) {
  claimsNodeIds.add(e.source.id);
  claimsNodeIds.add(e.target.id);
}

function GraphSVG({
  showClaims,
  hoveredNode,
  onHover,
}: {
  showClaims: boolean;
  hoveredNode: string | null;
  onHover: (id: string | null) => void;
}) {
  // Build connected sets for hovered node
  const ragConn = new Set<string>();
  const claimsConn = new Set<string>();
  if (hoveredNode) {
    for (const e of ragEdges) {
      if (e.source.id === hoveredNode || e.target.id === hoveredNode) {
        ragConn.add(e.source.id);
        ragConn.add(e.target.id);
      }
    }
    if (showClaims) {
      for (const e of claimsEdges) {
        if (e.source.id === hoveredNode || e.target.id === hoveredNode) {
          claimsConn.add(e.source.id);
          claimsConn.add(e.target.id);
        }
      }
    }
  }
  const allConn = new Set([...ragConn, ...claimsConn]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      onMouseLeave={() => onHover(null)}
    >
      {/* Background */}
      <rect width={W} height={H} rx={12} fill="hsl(222, 20%, 7%)" />

      {/* RAG edges */}
      {ragEdges.map((e, i) => {
        const active =
          hoveredNode &&
          (e.source.id === hoveredNode || e.target.id === hoveredNode);
        const dimmed = hoveredNode && !active;
        return (
          <line
            key={`rag-${i}`}
            x1={e.source.x}
            y1={e.source.y}
            x2={e.target.x}
            y2={e.target.y}
            stroke={
              active
                ? "rgba(150, 165, 200, 0.55)"
                : dimmed
                ? "rgba(65, 70, 90, 0.06)"
                : "rgba(100, 115, 155, 0.18)"
            }
            strokeWidth={active ? 1.5 : 0.6}
          />
        );
      })}

      {/* Claims edges */}
      {showClaims &&
        claimsEdges.map((e, i) => {
          const active =
            hoveredNode &&
            (e.source.id === hoveredNode || e.target.id === hoveredNode);
          const dimmed = hoveredNode && !active;
          return (
            <g key={`claim-${i}`}>
              {/* Glow */}
              <line
                x1={e.source.x}
                y1={e.source.y}
                x2={e.target.x}
                y2={e.target.y}
                stroke={
                  active
                    ? "rgba(245, 158, 50, 0.30)"
                    : dimmed
                    ? "rgba(245, 158, 50, 0.03)"
                    : "rgba(245, 158, 50, 0.15)"
                }
                strokeWidth={active ? 8 : 4}
              />
              {/* Core */}
              <line
                x1={e.source.x}
                y1={e.source.y}
                x2={e.target.x}
                y2={e.target.y}
                stroke={
                  active
                    ? "hsl(32, 95%, 58%)"
                    : dimmed
                    ? "rgba(245, 158, 50, 0.06)"
                    : "rgba(245, 158, 50, 0.55)"
                }
                strokeWidth={active ? 2 : 1.2}
                strokeDasharray={active ? "none" : "5 3"}
              />
            </g>
          );
        })}

      {/* Nodes */}
      {nodes.map((n) => {
        const isHov = n.id === hoveredNode;
        const isConn = allConn.has(n.id);
        const isFaded = hoveredNode && !isHov && !isConn;
        const isClaimsConn = claimsConn.has(n.id);
        const r = 4 + Math.min(n.claims, 12) * 0.4;

        return (
          <g
            key={n.id}
            onMouseEnter={() => onHover(n.id)}
            style={{ cursor: "pointer" }}
          >
            {/* Hit area */}
            <circle cx={n.x} cy={n.y} r={r + 8} fill="transparent" />

            {/* Glow */}
            {isHov && (
              <circle
                cx={n.x}
                cy={n.y}
                r={r + 6}
                fill={
                  isClaimsConn && showClaims
                    ? "rgba(245,158,50,0.10)"
                    : "rgba(100,120,200,0.10)"
                }
              />
            )}

            {/* Node */}
            <circle
              cx={n.x}
              cy={n.y}
              r={isHov ? r + 2 : r}
              fill={
                isFaded
                  ? "rgba(55, 60, 80, 0.25)"
                  : isClaimsConn && showClaims
                  ? "hsl(32, 85%, 55%)"
                  : "hsl(225, 40%, 50%)"
              }
              stroke={
                isHov
                  ? "white"
                  : isClaimsConn && showClaims
                  ? "rgba(245,158,50,0.5)"
                  : isConn
                  ? "rgba(180,190,220,0.4)"
                  : "rgba(130,140,170,0.06)"
              }
              strokeWidth={isHov ? 1.5 : 0.5}
            />

            {/* Label */}
            {(isHov || isConn) && (
              <>
                <rect
                  x={n.x - 60}
                  y={n.y - r - 18}
                  width={120}
                  height={13}
                  rx={2}
                  fill="rgba(12, 14, 22, 0.88)"
                />
                <text
                  x={n.x}
                  y={n.y - r - 8}
                  textAnchor="middle"
                  fill={
                    isHov
                      ? "white"
                      : isClaimsConn && showClaims
                      ? "rgba(245,190,100,0.9)"
                      : "rgba(190,200,220,0.8)"
                  }
                  fontSize={isHov ? 8 : 7}
                  fontWeight={isHov ? 600 : 400}
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {n.label.length > 30 ? n.label.slice(0, 27) + "\u2026" : n.label}
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* Stats overlay */}
      <text x={14} y={H - 12} fill="rgba(140,150,180,0.5)" fontSize={9} fontFamily="Inter, system-ui">
        {ragEdges.length} RAG edges
        {showClaims && ` + ${claimsEdges.length} claim bridges`}
      </text>
    </svg>
  );
}

export default function KnowledgeGraph() {
  const [showClaims, setShowClaims] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Get tooltip data for hovered node
  const hoveredClaimsEdges = hoveredNode
    ? claimsEdges.filter(
        (e) => e.source.id === hoveredNode || e.target.id === hoveredNode
      )
    : [];
  const hoveredNodeData = hoveredNode ? nodeMap.get(hoveredNode) : null;

  return (
    <div className="w-full">
      {/* Legend + toggle */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-[2px] w-4 bg-[rgba(100,115,155,0.45)]" />
            RAG similarity
          </span>
          {showClaims && (
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-[3px] w-4 rounded-sm bg-[hsl(32,95%,55%)]" />
              Claim bridge
            </span>
          )}
        </div>
        <button
          onClick={() => setShowClaims((v) => !v)}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
            showClaims
              ? "border-[hsl(32,70%,45%)] bg-[hsl(32,90%,55%)]/10 text-[hsl(32,90%,70%)] shadow-[0_0_12px_rgba(245,158,50,0.15)]"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          }`}
        >
          {showClaims ? "Claims layer ON" : "Show claims layer"}
        </button>
      </div>

      {/* Graph */}
      <div className="rounded-xl border border-border overflow-hidden">
        <GraphSVG
          showClaims={showClaims}
          hoveredNode={hoveredNode}
          onHover={setHoveredNode}
        />
      </div>

      {/* Tooltip */}
      {hoveredNodeData && hoveredClaimsEdges.length > 0 && showClaims && (
        <div className="mt-3 rounded-xl border border-[hsl(32,40%,22%)] bg-[hsl(222,20%,9%)] p-4 text-xs">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(32,80%,65%)]">
            Claims bridge: &ldquo;{hoveredNodeData.label}&rdquo;
          </p>
          {hoveredClaimsEdges.slice(0, 3).map((e, i) => {
            const other =
              e.source.id === hoveredNodeData.id ? e.target : e.source;
            return (
              <div key={i} className="mt-2 border-t border-border/30 pt-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-foreground font-medium">
                    &rarr; {other.label}
                  </span>
                  <span className="shrink-0 rounded-full bg-[hsl(32,90%,55%)]/15 px-2 py-0.5 text-[10px] font-semibold text-[hsl(32,85%,60%)]">
                    +{(e.lift * 100).toFixed(0)}% lift
                  </span>
                </div>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground/70 italic">
                  via claim: &ldquo;{e.claim.slice(0, 80)}&hellip;&rdquo;
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
