# Assay Beta — Install Guide

**For the first 5 closed-beta users. Levi walks you through this live.**

**Date:** 2026-04-20

---

## What you're installing

Assay is a local-first tool that indexes your product docs (markdown folder, Notion workspace) and answers questions about them with citations. Runs entirely on your machine as a single SQLite file. Integrates with Claude Code via an MCP server.

## Time budget

Total hands-on time: **~5 minutes.** First-index runs in the background.

## Prerequisites

- macOS or Linux (Windows untested)
- Node 18 or newer
- Claude Code installed (for the MCP integration)

## Install

```bash
git clone https://github.com/levievanshantz/assaylabs.git
cd assaylabs
git checkout phase-1-sqlite-local-first
npm install
```

## Point Assay at your docs

```bash
# Pick a folder of markdown files
./node_modules/.bin/tsx bin/assay.ts add ~/my-prds --name prds

# Index them — first run downloads ~420MB embedding model
./node_modules/.bin/tsx bin/assay.ts index

# Verify
./node_modules/.bin/tsx bin/assay.ts status
```

## Wire up Claude Code

Add this to your `~/Library/Application Support/Claude/claude_desktop_config.json` `mcpServers` block:

```json
"assay": {
  "command": "node",
  "args": ["/absolute/path/to/assaylabs/mcp-server/dist/index.js"],
  "env": {
    "ASSAY_DB": "sqlite",
    "ASSAY_DB_PATH": "/Users/YOU/.assay/assay.db"
  }
}
```

Then restart Claude Desktop.

Test it: `/assay-retrieve` in any Claude Code session, ask a question about something in your corpus.

## Live-update mode (optional)

In a separate terminal:

```bash
./node_modules/.bin/tsx bin/assay.ts watch
```

New/edited markdown files in your collection are re-indexed on save.

## Known Phase 1 limitations

Ship with your eyes open. The following are documented in `docs/assay-future-features-20-04-26.md`:

1. **Claim excerpt faithfulness — 52%.** When Assay cites a quote from a claim, about half the time the quote doesn't verbatim appear in the source doc (paraphrase or cross-doc shuffle). **Mitigation:** if a quote looks off, click through to the source. This is being fixed in Phase 2.
2. **FTS5 vs Postgres retrieval drift.** On abstract-policy queries (e.g. "extraction prompt bias"), SQLite retrieval ranks docs slightly differently than the cloud path. Top-10 overlap is strong; top-5 can differ. No answer-correctness impact, just document order.
3. **No claim extraction on the SQLite path yet.** You can retrieve and get briefings, but the *typed claim* layer (finding/recommendation/assumption) is only available against the Postgres corpus. SQLite path returns evidence-level results.
4. **Single machine only.** Your `assay.db` is yours. No team sharing yet.
5. **OpenAI embeddings optional.** Without `OPENAI_API_KEY`, Assay uses a local 1024d model (bge-large). Quality is close but not identical.

## Opt in to usage telemetry (optional)

If you're willing, set `ASSAY_TELEMETRY=on` in the same env block. Nothing leaves your machine automatically — events land in `~/.assay/telemetry.jsonl` and Levi asks you to paste it during the week-2 check-in. That's how we measure the cold-start, retention, and citation-rate gates.

## What we want from you in the first week

- Install once, index your real corpus.
- Use `/assay-retrieve` or `/assay-scan` at least twice in a real PRD session.
- When something is wrong, incorrect, or confusing, file a GitHub issue ([template pre-filled](https://github.com/levievanshantz/assaylabs/issues/new?template=beta-feedback.md)).
- Paste any `[Assay: ...]` tokens you copy into your PRDs — that's how we'll measure the citation rate.
- Do NOT smooth over errors. Report the jagged edges. That's the whole point.

## Direct line

Slack / email / text Levi. Five users, no ticket backlog.

---

**Version:** Phase 1 closed beta · 2026-04-20
