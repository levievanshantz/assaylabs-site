
---
# assaylabs-site | 2026-04-25 | 16:30 update

## Active Work
- Added Decisions & Ambient Tagging section to /docs (commit `b552a89`, pushed to main, Vercel rebuild triggered)
- New `DecisionsSection` component covers: what a decision is, three capture paths (structural/ambient drain/T0 backfill), tag format, `assay drain` CLI usage, `assay_decision_recall` and `assay_decision_expand` MCP tools, `assay doctor` health check
- Sidebar nav updated: new "Decisions & Ambient Tagging" link between Evidence & Claims and Retrieval Pipeline
- TypeScript type-check clean

## Blockers
- None

## Deadlines (next 7 days)
- None upcoming

## Files Changed (this session)
- src/app/docs/page.tsx (DecisionsSection + composition)
- src/app/docs/sidebar.tsx (nav entry)
- CLAUDE.md (Recent Changes, Latest Commit pointer)

## Handoff Notes
- Mirrors the spec at assaylabs/docs/assay-ambient-decision-tagging-spec-25-04-26.md v1.1
- 63MB demo video on landing page still flagged for compression (pre-existing TODO, unchanged this session)
