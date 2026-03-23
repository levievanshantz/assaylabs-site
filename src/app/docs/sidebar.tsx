import Link from "next/link";

const NAV_SECTIONS: {
  title: string;
  links: { label: string; id: string }[];
}[] = [
  {
    title: "Getting Started",
    links: [
      { label: "Overview", id: "overview" },
      { label: "Installation", id: "installation" },
      { label: "Quick Start", id: "quickstart" },
    ],
  },
  {
    title: "Core Concepts",
    links: [
      { label: "How It Works", id: "how-it-works" },
      { label: "Evidence & Claims", id: "evidence-and-claims" },
      { label: "Retrieval Pipeline", id: "retrieval" },
    ],
  },
  {
    title: "Tools Reference",
    links: [
      { label: "brief", id: "tools-brief" },
      { label: "stress_test", id: "tools-stress-test" },
      { label: "retrieve_evidence", id: "tools-retrieve-evidence" },
      { label: "sync_notion", id: "tools-sync-notion" },
      { label: "health_check", id: "tools-health-check" },
    ],
  },
  {
    title: "Configuration",
    links: [
      { label: "Extraction Modes", id: "extraction-modes" },
      { label: "Feature Toggles", id: "feature-toggles" },
      { label: "Presets", id: "presets" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "Notion Ingestion", id: "guides-notion" },
      { label: "Background Hygiene", id: "guides-hygiene" },
      { label: "Troubleshooting", id: "guides-troubleshooting" },
    ],
  },
];

export { NAV_SECTIONS };

/* ── Sidebar nav (server component) ── */
export function DocsSidebar() {
  return (
    <aside
      className="
        hidden md:block sticky top-0 h-screen w-60 overflow-y-auto shrink-0
        bg-[hsl(220,15%,9%)] border-r border-[hsl(220,15%,18%)]
      "
    >
      <div className="px-5 pt-6 pb-4">
        <Link
          href="/"
          className="text-[hsl(220,15%,93%)] font-semibold text-sm tracking-wide"
        >
          Assaylabs
        </Link>
        <span className="ml-2 text-xs text-[hsl(220,10%,55%)]">Docs</span>
      </div>

      <nav className="px-3 pb-8">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mb-6">
            <h4 className="px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-[hsl(220,10%,55%)]">
              {section.title}
            </h4>
            <ul className="space-y-0.5">
              {section.links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="
                      block w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors
                      text-[hsl(220,10%,55%)] hover:text-[hsl(220,15%,93%)] hover:bg-[hsl(220,15%,12%)]
                    "
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

/* ── Mobile sidebar toggle (client component) ── */
export { MobileSidebarToggle } from "./mobile-sidebar-toggle";
