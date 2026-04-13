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
  hasClaimsEdge?: boolean;
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
const RAG_EDGE_COLOR = "rgba(100, 115, 155, 0.20)";
const RAG_EDGE_ACTIVE = "rgba(150, 165, 200, 0.55)";
const CLAIMS_EDGE_COLOR = "rgba(245, 158, 50, 0.60)";
const CLAIMS_GLOW = "rgba(245, 158, 50, 0.18)";
const CLAIMS_ACTIVE = "hsl(32, 95%, 58%)";
const CLAIMS_ACTIVE_GLOW = "rgba(245, 158, 50, 0.30)";
const NODE_COLOR = "hsl(225, 40%, 50%)";
const NODE_CLAIMS_COLOR = "hsl(32, 85%, 55%)";
const NODE_FADED = "rgba(55, 60, 80, 0.25)";

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showClaims, setShowClaims] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 900, height: 520 });

  // All mutable state lives in refs — no React re-renders on hover
  const nodesRef = useRef<GraphNode[]>([]);
  const ragEdgesRef = useRef<RagEdge[]>([]);
  const claimsEdgesRef = useRef<ClaimsEdge[]>([]);
  const hoveredIdRef = useRef<string | null>(null);
  const showClaimsRef = useRef(true);
  const needsDrawRef = useRef(false);
  const animRef = useRef<number>(0);
  const simSettledRef = useRef(false);

  // Tooltip state — only React state needed for DOM rendering
  const [tooltip, setTooltip] = useState<{
    node: GraphNode;
    edges: ClaimsEdge[];
  } | null>(null);

  useEffect(() => { showClaimsRef.current = showClaims; needsDrawRef.current = true; }, [showClaims]);

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
    simSettledRef.current = false;
    needsDrawRef.current = true;

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

    // Mark claims-participating nodes
    const claimsSet = new Set<string>();
    for (const e of claimsEdges) {
      claimsSet.add((e.source as GraphNode).id);
      claimsSet.add((e.target as GraphNode).id);
    }
    for (const n of nodes) n.hasClaimsEdge = claimsSet.has(n.id);

    nodesRef.current = nodes;
    ragEdgesRef.current = ragEdges;
    claimsEdgesRef.current = claimsEdges;

    const sim = forceSimulation(nodes)
      .force(
        "link",
        forceLink([...ragEdges])
          .id((d: any) => d.id)
          .distance(90)
          .strength((d: any) => (d.similarity || 0.5) * 0.2)
      )
      .force("charge", forceManyBody().strength(-200))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide(26))
      .alphaDecay(0.02);

    sim.on("tick", () => { needsDrawRef.current = true; });
    sim.on("end", () => { simSettledRef.current = true; });

    function draw() {
      // Only redraw when something changed
      if (!needsDrawRef.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      needsDrawRef.current = false;
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const hovId = hoveredIdRef.current;
      const showC = showClaimsRef.current;

      // Compute connected sets for hovered node
      const ragConn = new Set<string>();
      const claimsConn = new Set<string>();
      if (hovId) {
        for (const e of ragEdges) {
          const s = (e.source as GraphNode).id;
          const t = (e.target as GraphNode).id;
          if (s === hovId || t === hovId) { ragConn.add(s); ragConn.add(t); }
        }
        if (showC) {
          for (const e of claimsEdges) {
            const s = (e.source as GraphNode).id;
            const t = (e.target as GraphNode).id;
            if (s === hovId || t === hovId) { claimsConn.add(s); claimsConn.add(t); }
          }
        }
      }
      const allConn = new Set([...ragConn, ...claimsConn]);

      /* ── RAG edges ── */
      for (const e of ragEdges) {
        const s = e.source as GraphNode;
        const t = e.target as GraphNode;
        if (s.x == null || t.x == null) continue;
        const active = hovId && (s.id === hovId || t.id === hovId);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y!);
        ctx.lineTo(t.x, t.y!);
        ctx.strokeStyle = active ? RAG_EDGE_ACTIVE : hovId ? "rgba(65, 70, 90, 0.06)" : RAG_EDGE_COLOR;
        ctx.lineWidth = active ? 1.5 : 0.6;
        ctx.stroke();
      }

      /* ── Claims edges ── */
      if (showC) {
        for (const e of claimsEdges) {
          const s = e.source as GraphNode;
          const t = e.target as GraphNode;
          if (s.x == null || t.x == null) continue;
          const active = hovId && (s.id === hovId || t.id === hovId);

          // Glow
          ctx.beginPath();
          ctx.moveTo(s.x, s.y!);
          ctx.lineTo(t.x, t.y!);
          ctx.strokeStyle = active ? CLAIMS_ACTIVE_GLOW : hovId ? "rgba(245,158,50,0.05)" : CLAIMS_GLOW;
          ctx.lineWidth = active ? 10 : 5;
          ctx.stroke();

          // Core
          ctx.beginPath();
          ctx.moveTo(s.x, s.y!);
          ctx.lineTo(t.x, t.y!);
          ctx.strokeStyle = active ? CLAIMS_ACTIVE : hovId ? "rgba(245,158,50,0.10)" : CLAIMS_EDGE_COLOR;
          ctx.lineWidth = active ? 2.5 : 1.5;

          // Dashed pattern for claims edges — visually distinct from solid RAG
          ctx.setLineDash(active ? [] : [6, 4]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Midpoint diamond on non-dimmed edges
          if (!hovId || active) {
            const mx = (s.x + t.x!) / 2;
            const my = (s.y! + t.y!) / 2;
            const sz = active ? 4 : 3;
            ctx.save();
            ctx.translate(mx, my);
            ctx.rotate(Math.PI / 4);
            ctx.fillStyle = active ? CLAIMS_ACTIVE : "rgba(245, 158, 50, 0.50)";
            ctx.fillRect(-sz, -sz, sz * 2, sz * 2);
            ctx.restore();
          }
        }
      }

      /* ── Nodes ── */
      for (const n of nodes) {
        if (n.x == null) continue;
        const isHov = n.id === hovId;
        const isConn = allConn.has(n.id);
        const isFaded = hovId && !isHov && !isConn;
        const isClaimsConn = claimsConn.has(n.id);

        const baseR = 5 + Math.min(n.claims, 12) * 0.5;
        const r = isHov ? baseR + 3 : baseR;

        // Glow
        if (isHov) {
          ctx.beginPath();
          ctx.arc(n.x, n.y!, r + 8, 0, Math.PI * 2);
          ctx.fillStyle = isClaimsConn && showC ? "rgba(245,158,50,0.10)" : "rgba(100,120,200,0.10)";
          ctx.fill();
        }

        // Fill
        ctx.beginPath();
        ctx.arc(n.x, n.y!, r, 0, Math.PI * 2);
        if (isFaded) {
          ctx.fillStyle = NODE_FADED;
        } else if (isClaimsConn && showC) {
          ctx.fillStyle = NODE_CLAIMS_COLOR;
        } else {
          ctx.fillStyle = NODE_COLOR;
        }
        ctx.fill();

        // Stroke
        ctx.strokeStyle = isHov ? "white"
          : isClaimsConn && showC ? "rgba(245,158,50,0.6)"
          : isConn ? "rgba(180,190,220,0.4)"
          : "rgba(130,140,170,0.08)";
        ctx.lineWidth = isHov ? 2 : isConn ? 1.5 : 0.5;
        ctx.stroke();

        // Labels
        if (isHov || isConn) {
          const label = n.label.length > 35 ? n.label.slice(0, 32) + "\u2026" : n.label;
          ctx.font = isHov ? "bold 11px Inter, system-ui" : "10px Inter, system-ui";
          ctx.textAlign = "center";
          const tw = ctx.measureText(label).width;

          // Background pill
          ctx.fillStyle = "rgba(12, 14, 22, 0.88)";
          const px = 5, py = 2;
          const lx = n.x - tw / 2 - px;
          const ly = n.y! - r - 20;
          ctx.beginPath();
          ctx.roundRect(lx, ly, tw + px * 2, 15, 3);
          ctx.fill();

          ctx.fillStyle = isHov ? "white"
            : isClaimsConn && showC ? "rgba(245,190,100,0.9)"
            : "rgba(190,200,220,0.8)";
          ctx.fillText(label, n.x, n.y! - r - 9);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      sim.stop();
      cancelAnimationFrame(animRef.current);
    };
  }, [dimensions]);

  // Mouse — update ref, flag redraw, only set React state for tooltip when node changes
  const prevHovIdRef = useRef<string | null>(null);

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

      const newId = closest?.id ?? null;

      // Always update ref + flag redraw (cheap)
      hoveredIdRef.current = newId;
      needsDrawRef.current = true;

      // Only update React state when the hovered node actually changes
      if (newId !== prevHovIdRef.current) {
        prevHovIdRef.current = newId;

        if (closest && showClaimsRef.current) {
          const edges = claimsEdgesRef.current.filter((edge) => {
            const s = (edge.source as GraphNode).id;
            const t = (edge.target as GraphNode).id;
            return s === newId || t === newId;
          });
          setTooltip(edges.length > 0 ? { node: closest, edges } : null);
        } else {
          setTooltip(null);
        }
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    hoveredIdRef.current = null;
    prevHovIdRef.current = null;
    needsDrawRef.current = true;
    setTooltip(null);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Stats + toggle */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-[2px] w-4 bg-[rgba(100,115,155,0.5)]" />
            RAG similarity
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-[3px] w-4 bg-[hsl(32,95%,55%)]" style={{ borderTop: "2px dashed hsl(32,95%,55%)" }} />
            Claim bridge
          </span>
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

      <canvas
        ref={canvasRef}
        style={{ width: dimensions.width, height: dimensions.height }}
        className="w-full rounded-xl border border-border bg-[hsl(222,20%,7%)] cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {/* Tooltip — only renders when hovered node has claims edges */}
      {tooltip && showClaims && (
        <div className="mt-3 rounded-xl border border-[hsl(32,40%,22%)] bg-[hsl(222,20%,9%)] p-4 text-xs">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(32,80%,65%)]">
            Claims bridge: &ldquo;{tooltip.node.label}&rdquo;
          </p>
          {tooltip.edges.slice(0, 3).map((e, i) => {
            const s = e.source as GraphNode;
            const t = e.target as GraphNode;
            const other = s.id === tooltip.node.id ? t : s;
            return (
              <div key={i} className="mt-2 border-t border-border/30 pt-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-foreground font-medium">&rarr; {other.label}</span>
                  <span className="shrink-0 rounded-full bg-[hsl(32,90%,55%)]/15 px-2 py-0.5 text-[10px] font-semibold text-[hsl(32,85%,60%)]">
                    +{(e.lift * 100).toFixed(0)}% lift over RAG
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
