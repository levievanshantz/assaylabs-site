# Daily Export — assaylabs-docs-site
_Last updated: 2026-04-05_

## What Shipped
- Docs page aligned with 4-tool MCP surface (removed sync/health_check, added scan/configure sections)
- Landing page scan description fixed to "pre-flight check"
- Demo video compressed (63MB .mov → 12MB .mp4) and source tags updated
- .mov removed from repo (commit b46db63)
- Sidebar navigation updated to match 4-tool surface
- K values corrected (stress_test=80, not 100)
- Quick Start references fixed (removed health_check/brief as standalone tools)
- Daily Export Protocol added to CLAUDE.md

## Current State
- Deployed on Vercel at assaylabs-docs.vercel.app
- All content matches current 4-tool surface
- Demo video serving as .mp4 (12MB)
- assaylabs.com domain NOT connected (parked at GoDaddy)

## Open Items
- Domain connection to Vercel (assaylabs.com)
- CLAUDE.md still references .mov as 63MB — needs update to reflect .mp4 only
