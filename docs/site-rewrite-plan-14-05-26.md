# Vercel site rewrite — locked plan
**Date:** 2026-05-14
**Status:** ready to execute
**Source:** 3-round Claude ↔ Codex (GPT-5.4 via OAuth) strategy review
**Ship mode:** one commit, full rewrite

---

## What changed in thinking (the audit before this audit)

The previous commit (`bebc715`) did terminology drift (claims → decisions) but kept the engineering voice. Pillars described retrieval architecture. Hero oversold ambient capture. Tools list used MCP registration names. Compare page listed frameworks.

Root cause: copy was written against `CAPABILITIES.md` (an engineer's self-model) instead of being translated for a PM audience. Pressure-test loop had no "would a PM read this in 30 seconds" pass.

This plan fixes it by writing against a **PM pitch anchor**, not against the implementation.

---

## The Anchor — 4-sentence PM pitch

> Assay is local-first decision memory for PMs — every call you commit to with Claude gets captured as a typed, queryable decision with reasoning attached, stored on your laptop. PMs make hundreds of small decisions a week that scatter across Slack and docs, so two weeks later nobody can answer "why did we kill that?" without an archeology dig. Assay fixes it ambiently: Claude tags decisions inline as you work, they land in your local memory, queryable forever — no API key, no cloud. Unlike Letta or MemGPT, we treat decisions as typed first-class objects with supersession trails, not text the LLM has to re-discover each session.

**Every paragraph of the site must be defensible against this pitch.** If a sentence on the site doesn't map back to a clause in the pitch, it gets deleted.

---

## The Wedge — one line, lands under the hero

> **Search retrieves artifacts. Assay resolves decision state.**

This is the consistency check. Every section either reinforces this distinction or it's noise.

---

## Hard rule — vocabulary blacklist

Any sentence in user-facing copy containing the following words gets deleted or rewritten:

- RRF, FTS5, sqlite-vec, BM25
- 1024-dim, 1536-dim, embedding dimension
- bge-large-en-v1.5 (use "local embedding model" if needed at all)
- cascade tier, T1, T2, T3, L1, L2, L3
- decision graph schema, claims table
- MCP tool, ListToolsRequestSchema
- briefing analyzer, depositBriefingOutput
- Pivot #N

Exception: the `/docs` glossary may carry one internal-table-name caveat for engineers who poke at the schema. Nowhere else.

---

## Section-by-section copy (ship verbatim or near-verbatim)

### HERO

> **A memory for product decisions — including the ones you reversed.**
>
> Save each decision with what changed, why it changed, and what replaced it. Call it from Claude. Keep it local. Stop re-deciding settled work.

### WEDGE KICKER (immediately below hero, set as a subhead)

> **Search retrieves artifacts. Assay resolves decision state.**

### THREE PILLARS (replace current §01 / §02 / §03)

**Pillar 1.**
> **You found the doc. You still don't know if the decision stands.**
> Assay records the current answer, the reasoning behind it, and the decision that replaced it.

**Pillar 2.**
> **Two months later, the team remembers the argument, not the outcome.**
> Capture decisions in a typed record with rationale, owners, and context — not scattered Slack archaeology.

**Pillar 3.**
> **Roadmaps drift when old calls quietly get reopened.**
> Assay keeps a clean supersession chain, so reversals are explicit and stale decisions stop resurfacing as live ones.

### §04 — TOOL LIST (replace the invented six-agent block)

**Two commands you'll use first:**

- **/assay-scan** — Check a direction before committing: clear, caution, or blocker.
- **/assay-decision** — Recall what was decided, by whom, and what replaced it.

**Also includes:**

- **/assay-retrieve** — Pull source evidence and briefing-ready context from the corpus.
- **/assay-stress-test** — Expose downstream conflicts, edge cases, and reversal risk.
- **/assay-config** — Set sources, modes, and capture behavior for your team.
- **/assay-sync-status** — Verify indexing, freshness, and decision-capture health.

### FAQ (replace `/compare`; embed on landing page as a section)

**Q: How is this different from Notion, search, or ChatGPT memory?**
Those tools store text. Assay stores decisions: what was decided, why, and what superseded it. You don't just retrieve notes; you resolve the current state.

**Q: Why not just write better docs?**
Because the problem isn't only missing documentation. It's missing decision state. Docs sprawl. Assay gives each decision a structured record and a visible history of reversals.

**Q: What do I actually use day to day?**
Start with two commands. **/assay-scan** tells you, before you commit, whether prior decisions support, caution, or block a direction. **/assay-decision** tells you what was decided about a topic, when, by whom, and what has been superseded since. If you need source evidence, use **/assay-retrieve**. If you want to pressure-test a proposal, use **/assay-stress-test**. **Decisions get captured as you work — you don't run a save command.**

**Q: Why should I trust it with product decisions?**
Because it stays local-first and survives across sessions. Your decision history doesn't disappear into chat scrollback or depend on someone remembering the right keyword.

### CTA (replace current footer install snippet)

Supporting line:
> **Closed beta for teams that want decision recall inside Claude, not another workspace.**

**Primary button — Install now**
> Run Assay locally and start with `/assay-scan`.

**Secondary button — Request concierge install**
> We'll help you get Assay running on your stack.

The install instructions block stays below the CTA pair, scoped to the current commands (`bash scripts/install-tester.sh`).

---

## What gets deleted

1. **`/compare` route** — kill it. Replace with redirect to the landing-page FAQ section anchor (`/#faq`).
2. **`/production` route** — kill it. Already a stub; delete the route entirely.
3. **Knowledge-graph SVG on landing** — delete or replace with a real screenshot of `/assay-decision` output. **Default: delete.** A real screenshot can come post-tester-1 once we have a representative DB.
4. **Any §03 "Pillar 03 — Synced provenance" content claiming evidence-edit alerts** — delete. The feature exists in code but the user experience isn't surfaced.
5. **The pricing / "Available Q3" type language** wherever it appears.
6. **The "Compare alternatives" header on landing** if present — folded into the new FAQ.

---

## Pages affected

| Route | Action |
|---|---|
| `/` | Full rewrite per copy above. Delete knowledge-graph SVG. Replace `§04` tool list. Add FAQ section. Replace CTA. |
| `/docs` | Light touch only — already mostly clean from `bebc715`. Verify install command matches CTA. Update Decisions section to point at `/assay-scan` + `/assay-decision` as the first two. Drop any retrieval-architecture vocabulary that escaped. |
| `/compare` | DELETE the route. Update sidebar nav (no compare link). Add redirect from `/compare` → `/#faq` so old links don't 404. |
| `/production` | DELETE the route entirely. Already a stub. |
| `src/app/layout.tsx` | SEO `<meta description>`: update to use the new hero language. |
| `src/app/docs/sidebar.tsx` | Remove `/compare` entry. |

---

## Execution plan (when we restart)

### Step 1: Dispatch subagents per page
- **Subagent A**: `/` — apply all copy above, delete SVG, restructure sections, replace CTA. Single biggest job.
- **Subagent B**: `/compare` deletion + redirect setup + sidebar update.
- **Subagent C**: `/production` deletion + sidebar/footer cleanup.
- **Subagent D**: `/docs` polish pass — verify install command consistency, drop residual jargon, point tool descriptions at the two-command lead.

All subagents get the same anchor pitch + wedge line + vocabulary blacklist. They write against the pitch, not against `CAPABILITIES.md`.

### Step 2: Pressure-test loop (the missing pass)
After all four subagents finish, dispatch ONE more agent with this job:

> "You are a PM with no engineering background reading this site cold for the first time. Read every page top to bottom. For each section, answer:
> 1. What did this section just tell me the product does?
> 2. Did it use any words I'd have to Google?
> 3. Does it make me want to click Install Now, or close the tab?
>
> Flag any section that fails 1, 2, or 3. Report findings."

That's the audience pass we never ran. It runs BEFORE commit, not after.

### Step 3: Cross-model second look on the assembled diff
Send the full pre-commit diff to GPT-5.4 with one question:
> "Does this read as a memory tool for PMs, or as engineering documentation marketed as a product? Be brutal."

If verdict is "engineering documentation marketed as a product," rewrite the flagged sections and re-run step 2.

### Step 4: Single commit, single push
> `feat(site): rewrite around decision-recall positioning for tester-1 closed beta`

The site auto-deploys to Vercel from `main`.

### Step 5: Don't iterate copy on guesses
Watch the first five tester interactions. Revise from observed confusion, not from draft churn. Specifically: instrument or have testers narrate "what did you expect this to do?" at the install moment and at first `/assay-scan` invocation.

---

## What we explicitly are NOT doing in this pass

- Full glossary rewrite (the current internal-table-name caveat is sufficient)
- New `/production` page (deferred until there's a team tier to sell)
- Reranker / dual-embedding marketing (feature-flagged off; not promised)
- ECC mention anywhere on the site (it's a separate tool the user installs independently)
- Pricing page or "available Q3" language

---

## The lesson (for the memory ledger)

Two failures compounded into one shipped-bad-copy event:

1. **CAPABILITIES.md is an engineer's self-model, not a marketing brief.** Translation from internal to external is a required step. Subagents reading CAPABILITIES.md as ground truth will produce engineering copy 100% of the time.
2. **The pressure-test loop had no audience-fit pass.** `/review`, `/health`, and cross-model second-opinion all spoke engineer. None asked "would a PM read this?"

Going forward, two new invariants:

- **For any marketing change**: write a 4-sentence pitch in plain language first, then write the site against the pitch.
- **For any user-facing copy change**: run an "ELI10 / PM audience" pass before the engineering review, and gate commit on it.

These two rules go in `CLAUDE.md` under a new section: "Audience-fit rule for user-facing copy." Add as part of the rewrite commit.

---

## Signed off

- **Claude Opus 4.7** (operator-facing instance) — strategy author
- **GPT-5.4 via OpenAI OAuth** (Codex CLI fallback; CLI binary still broken — see `npm install -g @openai/codex@latest`) — strategy reviewer over 3 rounds
- **Levi Shantz** — to review fresh, sign off, then we execute

End of doc.
