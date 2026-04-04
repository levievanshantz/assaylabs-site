<!-- ORCHESTRATOR-MANAGED: Do not remove this marker. The daily review system checks for it. -->

# Assay Labs Docs Site

Marketing and documentation site for Assay.

## Stack
- Next.js 16 (React 19, App Router)
- Tailwind CSS v4
- TypeScript
- Deployed on Vercel

## Relationship to ILP
This is the public-facing site. Content should reflect the current state of the product.
The intelligence-ledger-prototype repo has the actual product code.

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
- `9574673` — Demo video + landing page 4-tool update + docs retrieve section
