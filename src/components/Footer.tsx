import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="foot">
      <div className="page row">
        <div className="col" style={{ maxWidth: 280 }}>
          <Wordmark />
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.6 }}>
            A precision instrument for product decisions. Local-first.
          </p>
        </div>
        <div className="col">
          <h5>Product</h5>
          <Link href="/">Overview</Link>
          <Link href="/#what">What it does</Link>
          <Link href="/docs">Docs</Link>
        </div>
        <div className="col">
          <h5>Resources</h5>
          <a href="https://github.com/levievanshantz/assaylabs">GitHub</a>
          <Link href="/#try">Try it</Link>
          <Link href="/docs">Changelog</Link>
        </div>
        <div className="col">
          <h5>Contact</h5>
          <a href="https://github.com/levievanshantz/assaylabs">GitHub</a>
          <a href="https://assaylabs.com">assaylabs.com</a>
        </div>
      </div>
      <div
        className="page"
        style={{
          marginTop: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="mono">© 2026 ASSAY LABS · ALL CLAIMS CITED</span>
        <span className="mono">REV 2026.06.09</span>
      </div>
    </footer>
  );
}
