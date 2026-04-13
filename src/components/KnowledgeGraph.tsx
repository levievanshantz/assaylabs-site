"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";
import graphData from "./knowledge-graph-data.json";

/* ── types ── */
interface GraphNode extends SimulationNodeDatum {
  id: string;
  label: string;
  type: string;
  claims: number;
  /* computed at render time */
  hasClaimsEdge?: boolean;
  claimsOnly?: boolean; // only reachable via claims edges
}

interface RagEdge extends SimulationLinkDatum<GraphNode> {
  similarity: number;
}

interface ClaimsEdge extends SimulationLinkDatum<GraphNode> {
  claimSim: number;
  ragSim: number;
  lift: number;
  claim: string;
}

/* ── colors ── */
const RAG_EDGE = "rgba(100, 110, 140, 0.25)";
const RAG_EDGE_HOVER = "rgba(140, 150, 180, 0.6)";
const CLAIMS_EDGE = "hsl(32, 95%, 55%)";       // warm orange — high contrast against blue
const CLAIMS_EDGE_GLOW = "rgba(245, 158, 50, 0.20)";
const CLAIMS_EDGE_DIM = "rgba(245, 158, 50, 0.12)";
const NODE_DEFAULT = "hsl(225, 40%, 50%)";
const NODE_CLAIMS = "hsl(32, 90%, 58%)";        // nodes only reachable via claims
const NODE_FADED = "rgba(60, 65, 85, 0.25)";

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [showClaims, setShowClaims] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 900, height: 520 });
  const nodesRef = useRef<GraphNode[]>([]);
  const ragEdgesRef = useRef<RagEdge[]>([]);
  const claimsEdgesRef = useRef<ClaimsEdge[]>([]);
  const hoveredRef = useRef<GraphNode | null>(null);
  const showClaimsRef = useRef(true);
  const animRef = useRef<number>(0);

  useEffect(() => { hoveredRef.current = hoveredNode; }, [hoveredNode]);
  useEffect(() => { showClaimsRef.current = showClaims; }, [showClaims]);

  // Responsive sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setDimensions({ width, height: Math.min(540, Math.max(380, width * 0.55)) });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Simulation + render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensions;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Build nodes
    const nodeMap = new Map<string, GraphNode>();
    const nodes: GraphNode[] = graphData.nodes.map((n) => {
      const node: GraphNode = {
        id: n.id,
        label: n.label,
        type: n.type,
        claims: n.claims,
        x: width / 2 + (Math.random() - 0.5) * width * 0.6,
        y: height / 2 + (Math.random() - 0.5) * height * 0.6,
      };
      nodeMap.set(n.id, node);
      return node;
    });

    // Build edges
    const ragEdges: RagEdge[] = (graphData.ragEdges || [])
      .map((e) => ({
        source: nodeMap.get(e.source)!,
        target: nodeMap.get(e.target)!,
        similarity: e.similarity,
      }))
      .filter((e) => e.source && e.target);

    const claimsEdges: ClaimsEdge[] = (graphData.claimsEdges || [])
      .map((e) => ({
        source: nodeMap.get(e.source)!,
        target: nodeMap.get(e.target)!,
        claimSim: e.claimSim,
        ragSim: e.ragSim,
        lift: e.lift,
        claim: e.claim,
      }))
      .filter((e) => e.source && e.target);

    // Mark nodes that participate in claims edges
    const ragConnected = new Set<string>();
    for (const e of ragEdges) {
      ragConnected.add((e.source as GraphNode).id);
      ragConnected.add((e.target as GraphNode).id);
    }
    const claimsConnected = new Set<string>();
    for (const e of claimsEdges) {
      claimsConnected.add((e.source as GraphNode).id);
      claimsConnected.add((e.target as GraphNode).id);
    }
    for (const n of nodes) {
      n.hasClaimsEdge = claimsConnected.has(n.id);
      // "claims-only" = connected via claims but has few/no RAG edges
      n.claimsOnly = claimsConnected.has(n.id) && !ragConnected.has(n.id);
    }

    nodesRef.current = nodes;
    ragEdgesRef.current = ragEdges;
    claimsEdgesRef.current = claimsEdges;

    // Link force uses only RAG edges for layout positioning
    // Claims edges are visual overlays — they shouldn't pull layout
    const sim = forceSimulation(nodes)
      .force(
        "link",
        forceLink([...ragEdges])
          .id((d: any) => d.id)
          .distance(90)
          .strength((d: any) => (d.similarity || 0.5) * 0.25)
      )
      .force("charge", forceManyBody().strength(-200))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide(24))
      .alphaDecay(0.018);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const hovered = hoveredRef.current;
      const showC = showClaimsRef.current;

      // Gather hovered connections
      const ragHovered = new Set<string>();
      const claimsHovered = new Set<string>();
      if (hovered) {
        for (const e of ragEdges) {
          const s = e.source as GraphNode;
          const t = e.target as GraphNode;
          if (s.id === hovered.id || t.id === hovered.id) {
            ragHovered.add(s.id);
            ragHovered.add(t.id);
          }
        }
        if (showC) {
          for (const e of claimsEdges) {
            const s = e.source as GraphNode;
            const t = e.target as GraphNode;
            if (s.id === hovered.id || t.id === hovered.id) {
              claimsHovered.add(s.id);
              claimsHovered.add(t.id);
            }
          }
        }
      }
      const allHovered = new Set([...ragHovered, ...claimsHovered]);

      /* ── 1. RAG edges (always visible, muted) ── */
      for (const e of ragEdges) {
        const s = e.source as GraphNode;
        const t = e.target as GraphNode;
        if (s.x == null || t.x == null) continue;
        const active = hovered && (s.id === hovered.id || t.id === hovered.id);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y!);
        ctx.lineTo(t.x, t.y!);
        ctx.strokeStyle = active
          ? RAG_EDGE_HOVER
          : hovered
          ? "rgba(70, 75, 95, 0.06)"
          : RAG_EDGE;
        ctx.lineWidth = active ? 1.5 : 0.6;
        ctx.stroke();
      }

      /* ── 2. Claims edges (the expansion — bright orange) ── */
      if (showC) {
        for (const e of claimsEdges) {
          const s = e.source as GraphNode;
          const t = e.target as GraphNode;
          if (s.x == null || t.x == null) continue;
          const active = hovered && (s.id === hovered.id || t.id === hovered.id);

          // Wide glow underneath
          ctx.beginPath();
          ctx.moveTo(s.x, s.y!);
          ctx.lineTo(t.x, t.y!);
          ctx.strokeStyle = active
            ? "rgba(245, 158, 50, 0.35)"
            : hovered
            ? CLAIMS_EDGE_DIM
            : CLAIMS_EDGE_GLOW;
          ctx.lineWidth = active ? 8 : 4;
          ctx.stroke();

          // Core line
          ctx.beginPath();
          ctx.moveTo(s.x, s.y!);
          ctx.lineTo(t.x, t.y!);
          ctx.strokeStyle = active
            ? CLAIMS_EDGE
            : hovered
            ? "rgba(245, 158, 50, 0.15)"
            : "rgba(245, 158, 50, 0.55)";
          ctx.lineWidth = active ? 2.5 : 1.5;
          ctx.stroke();

          // Midpoint marker — small diamond
          if (!hovered || active) {
            const mx = (s.x + (t as GraphNode).x!) / 2;
            const my = (s.y! + (t as GraphNode).y!) / 2;
            ctx.save();
            ctx.translate(mx, my);
            ctx.rotate(Math.PI / 4);
            ctx.fillStyle = active ? CLAIMS_EDGE : "rgba(245, 158, 50, 0.45)";
            ctx.fillRect(-3, -3, 6, 6);
            ctx.restore();
          }
        }
      }

      /* ── 3. Nodes ── */
      for (const n of nodes) {
        if (n.x == null) continue;
        const isHovered = hovered?.id === n.id;
        const isRagConn = ragHovered.has(n.id);
        const isClaimsConn = claimsHovered.has(n.id);
        const isConnected = allHovered.has(n.id);
        const isFaded = hovered && !isHovered && !isConnected;

        const baseR = 5 + Math.min(n.claims, 12) * 0.5;
        const r = isHovered ? baseR + 3 : baseR;

        // Claims-only nodes glow orange when claims visible
        const isClaimsNode = showC && n.hasClaimsEdge;

        // Outer glow
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y!, r + 8, 0, Math.PI * 2);
          ctx.fillStyle = isClaimsConn
            ? "rgba(245, 158, 50, 0.12)"
            : "rgba(100, 120, 200, 0.12)";
          ctx.fill();
        }

        // Node fill
        ctx.beginPath();
        ctx.arc(n.x, n.y!, r, 0, Math.PI * 2);
        if (isFaded) {
          ctx.fillStyle = NODE_FADED;
        } else if (isClaimsConn && showC) {
          ctx.fillStyle = NODE_CLAIMS;
        } else if (isClaimsNode && !hovered) {
          // Subtle warm tint for claims-participating nodes
          ctx.fillStyle = "hsl(220, 45%, 55%)";
        } else {
          ctx.fillStyle = NODE_DEFAULT;
        }
        ctx.fill();

        // Ring
        ctx.strokeStyle = isHovered
          ? "white"
          : isClaimsConn && showC
          ? "rgba(245, 158, 50, 0.7)"
          : isRagConn
          ? "rgba(180, 190, 220, 0.5)"
          : "rgba(150, 160, 190, 0.08)";
        ctx.lineWidth = isHovered ? 2 : isConnected ? 1.5 : 0.5;
        ctx.stroke();

        // Labels
        if (isHovered || isConnected) {
          const label = n.label.length > 32 ? n.label.slice(0, 29) + "..." : n.label;
          ctx.font = isHovered
            ? "bold 11px Inter, system-ui, sans-serif"
            : "10px Inter, system-ui, sans-serif";
          ctx.textAlign = "center";

          // Text background for readability
          const tw = ctx.measureText(label).width;
          ctx.fillStyle = "rgba(15, 17, 25, 0.85)";
          ctx.fillRect(n.x - tw / 2 - 4, n.y! - r - 18, tw + 8, 14);

          ctx.fillStyle = isHovered
            ? "white"
            : isClaimsConn && showC
            ? "rgba(245, 190, 100, 0.9)"
            : "rgba(200, 210, 230, 0.8)";
          ctx.fillText(label, n.x, n.y! - r - 7);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    sim.on("tick", () => {});
    animRef.current = requestAnimationFrame(draw);

    return () => {
      sim.stop();
      cancelAnimationFrame(animRef.current);
    };
  }, [dimensions]);

  // Mouse
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let closest: GraphNode | null = null;
      let closestDist = 28;
      for (const n of nodesRef.current) {
        if (n.x == null) continue;
        const dx = n.x - mx;
        const dy = n.y! - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) {
          closest = n;
          closestDist = dist;
        }
      }
      setHoveredNode(closest);
    },
    []
  );

  // Hovered claims tooltip data
  const hoveredClaimsEdges = hoveredNode
    ? claimsEdgesRef.current.filter((e) => {
        const s = e.source as GraphNode;
        const t = e.target as GraphNode;
        return s.id === hoveredNode.id || t.id === hoveredNode.id;
      })
    : [];

  const ragCount = ragEdgesRef.current.length;
  const claimsCount = claimsEdgesRef.current.length;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Stats bar */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <span>
            <span className="font-mono text-foreground">{ragCount}</span> RAG connections
          </span>
          <span className={showClaims ? "text-[hsl(32,90%,65%)]" : "text-muted-foreground"}>
            <span className="font-mono">{showClaims ? `+${claimsCount}` : claimsCount}</span> via claims
          </span>
        </div>
        <button
          onClick={() => setShowClaims((v) => !v)}
          className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
            showClaims
              ? "border-[hsl(32,70%,45%)] bg-[hsl(32,90%,55%)]/10 text-[hsl(32,90%,70%)]"
              : "border-border bg-card text-muted-foreground hover:text-foreground"
          }`}
        >
          {showClaims ? "Claims layer ON" : "Show claims layer"}
        </button>
      </div>

      <canvas
        ref={canvasRef}
        style={{ width: dimensions.width, height: dimensions.height }}
        className="w-full rounded-xl border border-border bg-[hsl(222,20%,7%)] cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredNode(null)}
      />

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-5 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-[2px] w-5 rounded-sm bg-[rgba(100,110,140,0.5)]" />
          RAG similarity
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-[3px] w-5 rounded-sm bg-[hsl(32,95%,55%)]" />
          Claim-bridged connection
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[hsl(225,40%,50%)]" />
          Document
        </span>
      </div>

      {/* Tooltip */}
      {hoveredNode && hoveredClaimsEdges.length > 0 && showClaims && (
        <div className="mt-3 rounded-xl border border-[hsl(32,50%,25%)] bg-[hsl(222,20%,9%)] p-4 text-xs">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(32,80%,65%)]">
            Claims-bridged from &ldquo;{hoveredNode.label}&rdquo;
          </p>
          {hoveredClaimsEdges.slice(0, 3).map((e, i) => {
            const s = e.source as GraphNode;
            const t = e.target as GraphNode;
            const other = s.id === hoveredNode.id ? t : s;
            return (
              <div key={i} className="mt-2 border-t border-border/30 pt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-foreground font-medium">
                    &rarr; {other.label}
                  </span>
                  <span className="ml-3 whitespace-nowrap rounded-full bg-[hsl(32,90%,55%)]/15 px-2 py-0.5 text-[10px] font-semibold text-[hsl(32,85%,60%)]">
                    +{(e.lift * 100).toFixed(0)}% lift
                  </span>
                </div>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground/70 italic">
                  &ldquo;{e.claim.slice(0, 75)}&hellip;&rdquo;
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
