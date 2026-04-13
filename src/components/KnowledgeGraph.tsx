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

/* ── color map ── */
const typeColor: Record<string, string> = {
  notion: "hsl(234, 80%, 65%)",
  manual: "hsl(170, 60%, 55%)",
  evaluation: "hsl(35, 90%, 60%)",
};

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

  // Keep refs in sync
  useEffect(() => { hoveredRef.current = hoveredNode; }, [hoveredNode]);
  useEffect(() => { showClaimsRef.current = showClaims; }, [showClaims]);

  // Responsive sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setDimensions({ width, height: Math.min(520, Math.max(360, width * 0.55)) });
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
    nodesRef.current = nodes;

    // Build edges
    const ragEdges: RagEdge[] = (graphData.ragEdges || [])
      .map((e) => ({
        source: nodeMap.get(e.source)!,
        target: nodeMap.get(e.target)!,
        similarity: e.similarity,
      }))
      .filter((e) => e.source && e.target);
    ragEdgesRef.current = ragEdges;

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
    claimsEdgesRef.current = claimsEdges;

    // All edges for link force
    const allLinks = [
      ...ragEdges.map((e) => ({ ...e, strength: e.similarity * 0.3 })),
      ...claimsEdges.map((e) => ({ ...e, strength: e.lift * 0.8 })),
    ];

    const sim = forceSimulation(nodes)
      .force(
        "link",
        forceLink(allLinks)
          .id((d: any) => d.id)
          .distance(100)
          .strength((d: any) => d.strength || 0.1)
      )
      .force("charge", forceManyBody().strength(-180))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide(22))
      .alphaDecay(0.02);

    function draw() {
      if (!ctx) return;
      const w = dimensions.width;
      const h = dimensions.height;
      ctx.clearRect(0, 0, w, h);

      const hovered = hoveredRef.current;
      const showC = showClaimsRef.current;

      // Gather hovered connections
      const hoveredConnections = new Set<string>();
      if (hovered) {
        for (const e of ragEdges) {
          const s = e.source as GraphNode;
          const t = e.target as GraphNode;
          if (s.id === hovered.id || t.id === hovered.id) {
            hoveredConnections.add(s.id);
            hoveredConnections.add(t.id);
          }
        }
        if (showC) {
          for (const e of claimsEdges) {
            const s = e.source as GraphNode;
            const t = e.target as GraphNode;
            if (s.id === hovered.id || t.id === hovered.id) {
              hoveredConnections.add(s.id);
              hoveredConnections.add(t.id);
            }
          }
        }
      }

      // Draw RAG edges
      for (const e of ragEdges) {
        const s = e.source as GraphNode;
        const t = e.target as GraphNode;
        if (s.x == null || t.x == null) continue;
        const isActive =
          hovered && (s.id === hovered.id || t.id === hovered.id);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y!);
        ctx.lineTo(t.x, t.y!);
        ctx.strokeStyle = isActive
          ? "rgba(120, 120, 140, 0.5)"
          : hovered
          ? "rgba(80, 80, 100, 0.08)"
          : "rgba(80, 80, 100, 0.15)";
        ctx.lineWidth = isActive ? 1.5 : 0.5;
        if (!isActive && hovered) {
          ctx.setLineDash([2, 4]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw claims edges
      if (showC) {
        for (const e of claimsEdges) {
          const s = e.source as GraphNode;
          const t = e.target as GraphNode;
          if (s.x == null || t.x == null) continue;
          const isActive =
            hovered && (s.id === hovered.id || t.id === hovered.id);

          // Glow effect for active claims edges
          if (isActive) {
            ctx.beginPath();
            ctx.moveTo(s.x, s.y!);
            ctx.lineTo(t.x, t.y!);
            ctx.strokeStyle = "rgba(124, 58, 237, 0.3)";
            ctx.lineWidth = 6;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.moveTo(s.x, s.y!);
          ctx.lineTo(t.x, t.y!);
          ctx.strokeStyle = isActive
            ? "hsl(265, 80%, 65%)"
            : hovered
            ? "rgba(124, 58, 237, 0.08)"
            : "rgba(124, 58, 237, 0.35)";
          ctx.lineWidth = isActive ? 2.5 : 1.2;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        if (n.x == null) continue;
        const isHovered = hovered?.id === n.id;
        const isConnected = hovered && hoveredConnections.has(n.id);
        const isFaded = hovered && !isHovered && !isConnected;

        const baseRadius = 5 + Math.min(n.claims, 15) * 0.6;
        const r = isHovered ? baseRadius + 3 : baseRadius;

        // Glow for hovered
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y!, r + 6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(124, 58, 237, 0.15)";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y!, r, 0, Math.PI * 2);
        ctx.fillStyle = isFaded
          ? "rgba(60, 60, 80, 0.3)"
          : typeColor[n.type] || "hsl(220, 30%, 55%)";
        ctx.fill();
        ctx.strokeStyle = isHovered
          ? "white"
          : isConnected
          ? "rgba(255,255,255,0.6)"
          : "rgba(255,255,255,0.1)";
        ctx.lineWidth = isHovered ? 2 : 0.5;
        ctx.stroke();

        // Label for hovered/connected
        if (isHovered || (isConnected && !isFaded)) {
          ctx.font = isHovered
            ? "bold 11px Inter, system-ui, sans-serif"
            : "10px Inter, system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillStyle = isHovered
            ? "white"
            : "rgba(255,255,255,0.7)";
          const label =
            n.label.length > 30 ? n.label.slice(0, 27) + "..." : n.label;
          ctx.fillText(label, n.x, n.y! - r - 6);
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

  // Mouse interaction
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let closest: GraphNode | null = null;
      let closestDist = 25;
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

  // Find claims edges for hovered node for tooltip
  const hoveredClaimsEdges = hoveredNode
    ? claimsEdgesRef.current.filter((e) => {
        const s = e.source as GraphNode;
        const t = e.target as GraphNode;
        return s.id === hoveredNode.id || t.id === hoveredNode.id;
      })
    : [];

  return (
    <div ref={containerRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        style={{ width: dimensions.width, height: dimensions.height }}
        className="w-full rounded-lg border border-border bg-[hsl(220,18%,8%)] cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredNode(null)}
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-6 rounded-sm bg-[rgba(80,80,100,0.4)]" />
            RAG connection
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-6 rounded-sm bg-[hsl(265,80%,65%)]" />
            Claims-only connection
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[hsl(234,80%,65%)]" />
            Notion
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-[hsl(170,60%,55%)]" />
            Manual
          </span>
        </div>

        <button
          onClick={() => setShowClaims((v) => !v)}
          className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${
            showClaims
              ? "border-[hsl(265,60%,50%)] bg-[hsl(265,60%,50%)]/10 text-[hsl(265,80%,75%)]"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          {showClaims ? "Claims layer ON" : "Claims layer OFF"}
        </button>
      </div>

      {/* Tooltip for claims connections */}
      {hoveredNode && hoveredClaimsEdges.length > 0 && showClaims && (
        <div className="mt-3 rounded-lg border border-[hsl(265,40%,25%)] bg-[hsl(220,18%,10%)] p-3 text-xs">
          <p className="mb-1.5 font-medium text-[hsl(265,80%,75%)]">
            Claims connections for &ldquo;{hoveredNode.label}&rdquo;
          </p>
          {hoveredClaimsEdges.slice(0, 3).map((e, i) => {
            const s = e.source as GraphNode;
            const t = e.target as GraphNode;
            const other = s.id === hoveredNode.id ? t : s;
            return (
              <div key={i} className="mt-1 text-muted-foreground">
                <span className="text-foreground">
                  &rarr; {other.label}
                </span>
                <span className="ml-2 text-[hsl(265,60%,60%)]">
                  lift +{(e.lift * 100).toFixed(0)}%
                </span>
                <p className="mt-0.5 pl-3 text-[10px] italic text-muted-foreground/70">
                  &ldquo;{e.claim.slice(0, 70)}&hellip;&rdquo;
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
