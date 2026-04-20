# Assay — Product Reference (for assaylabs-docs-site / Vercel)

**Date:** 2026-04-20
**Phase:** 1 (closed beta)
**Status:** Evaluation copy — ready to lift into assaylabs-docs-site

This doc is the canonical product reference for Assay in its current state.
It is written to be dropped straight into the Vercel-hosted docs site with
minimal editing. Everything below describes the `phase-1-sqlite-local-first`
branch as of the date above.

---

## What Assay is

Assay is a local-first institutional memory tool for product decision-makers
using AI-native dev tools like Claude Code. It indexes a folder of markdown
documents (PRDs, research notes, strategy memos), extracts typed claims with
citations, and returns structured briefings that cite the evidence behind
every statement.

**One-sentence pitch:** from zero docs to cited decision context in five
minutes.

**What it is not:** not a search tool, not a general-purpose RAG app, not a
session-memory recorder. Assay treats the *claim* as the unit of value —
findings, recommendations, assumptions, metrics — not the document passage.

---

## Install (closed beta)

Assay runs entirely on your local machine as a single SQLite file. No
Docker, no database config, no account.

```bash
# Inside any terminal with Node 18+
git clone https://github.com/levievanshantz/assaylabs.git
cd assaylabs
git checkout phase-1-sqlite-local-first
npm install

# Point it at a folder of markdown docs
./node_modules/.bin/tsx bin/assay.ts add ~/my-prds --name prds
./node_modules/.bin/tsx bin/assay.ts index
./node_modules/.bin/tsx bin/assay.ts status
```

First index call downloads the local embedding model (~420MB, one-time).
After that, indexing a 50-doc folder takes ≤60 seconds on a recent
MacBook.

No `OPENAI_API_KEY` is required. If one is present, Assay uses it
automatically for higher-quality embeddings (OpenAI
`text-embedding-3-small`, 1536d). If not, it falls back to the local
model (`Xenova/bge-large-en-v1.5`, 1024d).

---

## CLI reference

### `assay add <path> [--name <n>] [--glob <pattern>]`
Register a folder as a collection. `--glob` defaults to `**/*.md`. Name
defaults to the folder's basename.

### `assay list`
Show registered collections and when each was last indexed.

### `assay remove <name>`
Remove the collection from the registry. Existing evidence rows are
preserved so a re-add plus `--force` index is a clean rebuild.

### `assay index [name] [--force]`
Index one collection (or all, if no name). Hash-gated — unchanged files
are skipped. `--force` re-embeds everything.

### `assay status`
Print active backend, embedding provider, and counts of collections,
evidence rows, and claims.

---

## Architecture (concise)

```
┌──────────────────────────────────────────────────────┐
│ CLI (bin/assay.ts)                                   │
│  add / list / remove / index / status                │
└─────────────────────┬────────────────────────────────┘
                      │
   ┌──────────────────┴──────────────────┐
   │                                     │
   ▼                                     ▼
fileCollectionSource.ts           indexCollection.ts
  scan + frontmatter + hash       chunk → embed → upsert
                                    │
                     ┌──────────────┼──────────────┐
                     ▼              ▼              ▼
              lib/chunker.ts   embeddings.ts   db-sqlite.ts
              (two-pass,       (local or       (better-sqlite3
               512 tokens)      OpenAI)         + sqlite-vec)
                                                  │
                                                  ▼
                                           ~/.assay/assay.db
                                           (single file)
```

**Evidence flow:** markdown file → YAML frontmatter parsed + stripped →
chunked to 512-token segments with heading paths → embedded as
1024-dim or 1536-dim float32 → stored as BLOB in `evidence_records` +
indexed in `evidence_fts` (FTS5).

**Retrieval flow:** query → dual FTS5 + vector search → optional
reranker → briefing with citations.

---

## Data model (Phase 1)

| Table | Purpose |
|-------|---------|
| `evidence_records` | One row per chunk. Holds text, embedding, provenance. |
| `evidence_fts` | FTS5 virtual table mirroring evidence_records for BM25. |
| `claims` | Typed claims extracted from evidence (Phase 2 surface). |
| `claims_fts` | FTS5 mirror of claims. |
| `collections` | Registered folders + glob + last_indexed. |
| `sync_state` | Per-file content_hash for delta indexing. |
| `evaluations` | Stress-test + briefing history. |
| `retrieval_config` | Per-product tuning of thresholds, top-k, reranker. |

No triggers, no RLS — SQLite semantics.

---

## Supported sources (Phase 1)

- **Markdown files** — local folder, glob-configurable
- **Notion** — existing connector preserved (via `nightly-sync.mjs`)

Confluence, Jira, Slack, and Google Docs are deferred until Phase 2
(see `docs/assay-future-features-20-04-26.md`).

---

## What's live vs what's coming

| Capability | Status |
|-----------|--------|
| SQLite backend | ✅ Shipped |
| Local embeddings (bge-large, 1024d) | ✅ Shipped |
| OpenAI embedding upgrade path | ✅ Shipped |
| Markdown folder ingestion | ✅ Shipped |
| CLI (add / list / remove / index / status) | ✅ Shipped |
| Hash-gated delta re-index | ✅ Shipped |
| FTS5 + vector hybrid search RPCs | ✅ Shipped |
| File watcher (`assay watch`) | ⏳ Next |
| Claim extraction in the SQLite path | ⏳ Next |
| Reranker (qwen3-0.6B) in SQLite path | ⏳ Next |
| Plugin packaging (Claude Code marketplace) | ⏳ Week 5 |
| Progressive disclosure | ⏸ Phase 2 |
| Multi-user / team mode | ⏸ Phase 3 |

---

## Privacy

- Everything indexed stays on your machine in `~/.assay/assay.db`.
- If `OPENAI_API_KEY` is set, the text of each chunk is sent to the
  OpenAI embeddings API; no other content leaves the device.
- If no key is set, no outbound network calls are made during indexing
  beyond the one-time model download.

---

## Success gates (beta)

1. Install-to-first-useful-result ≤ 5 minutes (median)
2. ≥60% week-2 retention among invited users
3. ≥40% of post-adoption PRDs cite a claim Assay surfaced (via explicit
   Assay citation tokens)
4. ≥1 unprompted referral within week 3
5. Zero factual disputes about briefings in week 1

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-20 | Phase 1: SQLite backend, local embeddings (bge-large 1024d), folder ingestion CLI. 31/31 integration tests pass. Branch `phase-1-sqlite-local-first` pushed. |

---

*For the internal product narrative + FAQ, see
`assay-press-release-20-04-26.md`. For the Phase 2 spec, see
`assay-progressive-disclosure-spec-20-04-26.md`. For deferred items with
trigger conditions, see `assay-future-features-20-04-26.md`.*
