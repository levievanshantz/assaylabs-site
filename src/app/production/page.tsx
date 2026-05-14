import type { Metadata } from "next";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Team tier — not yet available — Assay",
  description:
    "Assay is local-first for the closed beta. There is no hosted backend, no shared team tier, and no Postgres cloud build in production today.",
};

export default function ProductionPage() {
  return (
    <>
      <Topbar active="production" />

      <main className="route" id="production">
        <div className="route-tag">
          <div className="route-tag-inner">
            <span className="mono">/production&nbsp;&nbsp;·&nbsp;&nbsp;TEAM TIER</span>
            <span className="mono-meta">NOT YET AVAILABLE</span>
          </div>
        </div>

        <div className="page prod-hero">
          <h1>
            Team tier &mdash; <em>not yet available.</em>
          </h1>
          <p className="lede">
            Assay is local-first for the closed beta. The single supported runtime today is
            SQLite at <code>~/.assay/assay.db</code> on your machine. There is no hosted
            backend, no shared team tier, and no Postgres cloud build in production. If you
            have multi-machine or shared-team needs, get in touch &mdash; it&rsquo;s on the
            roadmap but not committed.
          </p>
          <div className="mono-meta" style={{ marginTop: 24 }}>
            Status: Closed beta &middot; Local-first only &middot; Last updated 2026-05-14
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
