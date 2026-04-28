<!-- ORCHESTRATOR-MANAGED: Do not remove this marker. The daily review system checks for it. -->

# Assay Labs Docs Site

Marketing and documentation site for Assay.

## Stack
- Next.js 16 (React 19, App Router)
- Tailwind CSS v4
- TypeScript
- Deployed on Vercel

## Relationship to assaylabs
This is the public-facing site. Content should reflect the current state of the product.
The `/Users/levishantz/assaylabs` repo (formerly `intelligence-ledger-prototype`) has the actual product code.

## Current State (as of commit 9574673)

### Landing Page
- Updated to reflect the 4-tool surface: `retrieve`, `scan`, `stress_test`, `configure`
- **Demo video** added: `public/assay-demo.mov` (63MB)
  - Note: 63MB .mov is heavy for web delivery — needs compression (e.g. ffmpeg to .mp4/H.264 at lower bitrate) before production use

### Docs Page
- Brief section replaced with **retrieve section** covering all 4 modes: `raw`, `guided`, `evaluate`, `brief`
- Tool descriptions match the current assay-mcp-server surface

## Constraints
- ANTHROPIC_API_KEY is off-limits in scripts
- Content changes are public — review before deploying

## Latest Commit
- `b552a89` — Decisions & Ambient Tagging docs section added (sidebar nav + DecisionsSection covering tag format, assay drain, and decision MCP tools)

## Recent Changes (April 25, 2026)
- Added `DecisionsSection` to /docs covering: decision primitive (atomic candidate rows, append-only `claim_evidence` audit trail), three capture paths (structural / ambient drain / T0 backfill), the `<decision>` tag format (impact + confidence attributes, required `<statement>` and `<reasoning>` children), `assay drain` CLI usage, `assay_decision_recall` + `assay_decision_expand` MCP tools, and `assay doctor` health check. Sidebar nav now includes "Decisions & Ambient Tagging" between Evidence & Claims and Retrieval Pipeline.

## Daily Export Protocol
<!-- ORCHESTRATOR-MANAGED — Do not remove this section. Injected by the global orchestrator instance. -->
<!-- If this section is missing after a CLAUDE.md rewrite, the orchestrator will re-inject it. -->

After completing any significant task (shipping a feature, updating MCP tools, running migrations,
completing PRD work), APPEND to the file at:

    .claude/daily-export.md

(relative to your project root). Create the `.claude/` directory if it doesn't exist.
