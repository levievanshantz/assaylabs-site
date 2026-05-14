import Link from "next/link";
import { Wordmark } from "./Wordmark";

type Route = "home" | "docs" | "production";

const NAV: { key: Route; href: string; label: string }[] = [
  { key: "home", href: "/", label: "Home" },
  { key: "docs", href: "/docs", label: "Docs" },
  { key: "production", href: "/production", label: "Production" },
];

export function Topbar({ active }: { active?: Route }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Wordmark />
        <nav>
          {NAV.map((n) => (
            <Link key={n.key} href={n.href} className={n.key === active ? "active" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="badge">
            <span className="dot" />
            Phase 1 · Closed beta
          </span>
          <Link className="btn btn--sm" href="/#install">
            Install
          </Link>
        </div>
      </div>
    </header>
  );
}
