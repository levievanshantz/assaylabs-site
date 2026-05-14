import Link from "next/link";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Topbar active="home" />

      <main className="route" id="home">
        <div className="route-tag">
          <div className="route-tag-inner">
            <span className="mono">/&nbsp;&nbsp;·&nbsp;&nbsp;HOME</span>
            <span className="mono-meta">REV 2026.05.14</span>
          </div>
        </div>

        {/* Hero */}
        <div className="page hero">
          <div className="eyebrow">
            <span className="dot" />
            <span>ASSAY LABS · DECISION MEMORY FOR PRODUCT TEAMS</span>
            <span style={{ marginLeft: "auto" }}>EST. 2026 · LOCAL-FIRST</span>
          </div>

          <h1>
            A memory for product decisions &mdash;{" "}
            <em>including the ones you reversed.</em>
          </h1>

          <p className="lede">
            Save each decision with what changed, why it changed, and what replaced it. Call it
            from Claude. Keep it local. Stop re-deciding settled work.
          </p>

          <p className="lede" style={{ marginTop: 18, fontWeight: 600 }}>
            Search retrieves artifacts. Assay resolves decision state.
          </p>

          <div className="hero-actions">
            <Link className="btn btn--lg" href="#install">
              Install now <span className="arrow">→</span>
            </Link>
            <a
              className="btn btn--ghost btn--lg"
              href="mailto:levishantz@gmail.com?subject=Assay%20concierge%20install"
            >
              Request concierge install
            </a>
          </div>

          <dl className="hero-meta">
            <div>
              <dt>Runs</dt>
              <dd>On your machine</dd>
            </div>
            <div>
              <dt>Surface</dt>
              <dd>Claude Code · CLI</dd>
            </div>
            <div>
              <dt>Cloud</dt>
              <dd>None. No API key.</dd>
            </div>
            <div>
              <dt>Phase</dt>
              <dd>1 · Closed beta</dd>
            </div>
          </dl>
        </div>

        {/* §01 Pillars */}
        <section className="s">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 01</div>
              <div>
                <h2 className="s-title">What Assay actually does.</h2>
                <p className="s-deck">
                  Three problems PMs have every week. Three things Assay fixes &mdash; not by
                  storing more text, but by tracking decision state.
                </p>
              </div>
            </div>

            <div className="pillars">
              <div className="pillar">
                <span className="num">PILLAR 01</span>
                <h3>
                  You found the doc.
                  <br />
                  You still don&rsquo;t know if the decision stands.
                </h3>
                <p>
                  Assay records the current answer, the reasoning behind it, and the decision
                  that replaced it.
                </p>
              </div>

              <div className="pillar">
                <span className="num">PILLAR 02</span>
                <h3>
                  Two months later, the team remembers
                  <br />
                  the argument, not the outcome.
                </h3>
                <p>
                  Capture decisions in a typed record with rationale, owners, and context &mdash;
                  not scattered Slack archaeology.
                </p>
              </div>

              <div className="pillar">
                <span className="num">PILLAR 03</span>
                <h3>
                  Roadmaps drift when old calls
                  <br />
                  quietly get reopened.
                </h3>
                <p>
                  Assay keeps a clear trail of what was reversed and what replaced it, so stale
                  decisions stop resurfacing as live ones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* §02 Tool list */}
        <section className="s">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 02</div>
              <div>
                <h2 className="s-title">Two commands you&rsquo;ll use first.</h2>
                <p className="s-deck">
                  Assay lives inside Claude Code as a small set of commands. Two carry most of the
                  day-to-day weight. The rest are there when you need them. See the full surface
                  in <Link href="/docs">/docs</Link>.
                </p>
              </div>
            </div>

            <div className="agents">
              <div className="agent">
                <div className="grp">PRIMARY</div>
                <div className="nm">/assay-scan</div>
                <div className="blurb">
                  Check a direction before committing: clear, caution, or blocker.
                </div>
              </div>
              <div className="agent">
                <div className="grp">PRIMARY</div>
                <div className="nm">/assay-decision</div>
                <div className="blurb">
                  Recall what was decided, by whom, and what replaced it.
                </div>
              </div>
            </div>

            <h3
              className="mono"
              style={{
                marginTop: 48,
                marginBottom: 16,
                fontSize: 13,
                letterSpacing: "0.12em",
                opacity: 0.7,
              }}
            >
              ALSO INCLUDES
            </h3>

            <div className="agents">
              <div className="agent">
                <div className="grp">RETRIEVAL</div>
                <div className="nm">/assay-retrieve</div>
                <div className="blurb">
                  Pull source evidence and briefing-ready context from your indexed documents.
                </div>
              </div>
              <div className="agent">
                <div className="grp">JUDGMENT</div>
                <div className="nm">/assay-stress-test</div>
                <div className="blurb">
                  Expose downstream conflicts, edge cases, and reversal risk.
                </div>
              </div>
              <div className="agent">
                <div className="grp">SYSTEM</div>
                <div className="nm">/assay-config</div>
                <div className="blurb">
                  Set sources, modes, and capture behavior for your team.
                </div>
              </div>
              <div className="agent">
                <div className="grp">SYSTEM</div>
                <div className="nm">/assay-sync-status</div>
                <div className="blurb">
                  Check that your documents are up to date and that capture is working.
                </div>
              </div>
            </div>

            <p className="mono-meta" style={{ marginTop: 32, textAlign: "center" }}>
              Decisions get captured as you work &mdash; no save command. Local-first, on your
              machine. No cloud. No API key.
            </p>
          </div>
        </section>

        {/* §03 FAQ */}
        <section className="s" id="faq">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 03</div>
              <div>
                <h2 className="s-title">Questions PMs ask first.</h2>
                <p className="s-deck">
                  If you&rsquo;re reading this cold, these are the four questions worth answering
                  before you install.
                </p>
              </div>
            </div>

            <div className="faq">
              <div className="faq-item">
                <h3>How is this different from Notion, search, or ChatGPT memory?</h3>
                <p>
                  Those tools store text. Assay stores decisions: what was decided, why, and what
                  superseded it. You don&rsquo;t just retrieve notes; you resolve the current
                  state.
                </p>
              </div>

              <div className="faq-item">
                <h3>Why not just write better docs?</h3>
                <p>
                  Because the problem isn&rsquo;t only missing documentation. It&rsquo;s missing
                  decision state. Docs sprawl. Assay gives each decision a structured record and a
                  visible history of reversals.
                </p>
              </div>

              <div className="faq-item">
                <h3>What do I actually use day to day?</h3>
                <p>
                  Start with two commands. <strong>/assay-scan</strong> tells you, before you
                  commit, whether prior decisions support, caution, or block a direction.{" "}
                  <strong>/assay-decision</strong> tells you what was decided about a topic, when,
                  by whom, and what has been superseded since. If you need source evidence, use{" "}
                  <strong>/assay-retrieve</strong>. If you want to pressure-test a proposal, use{" "}
                  <strong>/assay-stress-test</strong>.{" "}
                  <strong>
                    Decisions get captured as you work &mdash; you don&rsquo;t run a save command.
                  </strong>
                </p>
              </div>

              <div className="faq-item">
                <h3>Why should I trust it with product decisions?</h3>
                <p>
                  Because your decision history doesn&rsquo;t depend on a cloud account or chat
                  scrollback. Everything lives in a single file on your laptop &mdash; your PRDs
                  never leave your machine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* §04 Install / CTA */}
        <section className="s" id="install">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 04</div>
              <div>
                <h2 className="s-title">Get Assay running.</h2>
                <p className="s-deck" style={{ fontWeight: 600 }}>
                  Closed beta for teams that want decision recall inside Claude, not another
                  workspace.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
                marginBottom: 40,
              }}
            >
              <div>
                <Link className="btn btn--lg" href="#install-snippet" style={{ width: "100%" }}>
                  Install now <span className="arrow">→</span>
                </Link>
                <p className="mono-meta" style={{ marginTop: 12 }}>
                  Run Assay locally and start with <code>/assay-scan</code>.
                </p>
              </div>
              <div>
                <a
                  className="btn btn--ghost btn--lg"
                  href="mailto:levishantz@gmail.com?subject=Assay%20concierge%20install"
                  style={{ width: "100%" }}
                >
                  Request concierge install
                </a>
                <p className="mono-meta" style={{ marginTop: 12 }}>
                  We&rsquo;ll help you get Assay running on your stack.
                </p>
              </div>
            </div>

            <div id="install-snippet">
              <div className="mono" style={{ marginBottom: 12 }}>
                CLI · TESTER INSTALL
              </div>
              <pre className="terminal">
                <span className="dim"># clone and install</span>
                {"\n"}
                <span className="prompt">$</span> git clone https://github.com/levievanshantz/assaylabs.git
                {"\n"}
                <span className="prompt">$</span> cd assaylabs
                {"\n"}
                <span className="prompt">$</span> bash scripts/install-tester.sh
                {"\n\n"}
                <span className="dim"># then, inside Claude Code</span>
                {"\n"}
                <span className="prompt">&gt;</span> /assay-scan should we ship the new onboarding flow this sprint
                {"\n"}
                <span className="prompt">&gt;</span> /assay-decision what did we settle on for activation metric
                {"\n\n"}
                <span className="ok">✓</span> local decision memory, ready inside Claude
              </pre>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
