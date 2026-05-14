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
      { label: "Evidence & Decisions", id: "evidence-and-decisions" },
      { label: "Decisions & Ambient Tagging", id: "decisions" },
      { label: "Retrieval Pipeline", id: "retrieval" },
    ],
  },
  {
    title: "Tools Reference",
    links: [
      { label: "retrieve", id: "tools-retrieve" },
      { label: "scan", id: "tools-scan" },
      { label: "stress_test", id: "tools-stress-test" },
      { label: "configure", id: "tools-configure" },
    ],
  },
  {
    title: "Configuration",
    links: [
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
  {
    title: "Reference",
    links: [{ label: "Glossary", id: "glossary" }],
  },
];

export { NAV_SECTIONS };

/* ── Sidebar nav (server component) ── */
export function DocsSidebar() {
  return (
    <aside className="docs-side">
      {NAV_SECTIONS.map((section, i) => (
        <div key={section.title} className="grp">
          <h6>{section.title}</h6>
          <ul>
            {section.links.map((link, j) => (
              <li key={link.id} className={i === 0 && j === 0 ? "active" : undefined}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

/* ── Right-rail TOC (server component) ── */
export function DocsToc() {
  // Flat list of top-level docs anchors
  const items: { label: string; id: string }[] = [
    { label: "Overview", id: "overview" },
    { label: "Installation", id: "installation" },
    { label: "Quick Start", id: "quickstart" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Evidence & Decisions", id: "evidence-and-decisions" },
    { label: "Decisions", id: "decisions" },
    { label: "Retrieval", id: "retrieval" },
    { label: "retrieve", id: "tools-retrieve" },
    { label: "scan", id: "tools-scan" },
    { label: "stress_test", id: "tools-stress-test" },
    { label: "configure", id: "tools-configure" },
    { label: "Toggles", id: "feature-toggles" },
    { label: "Presets", id: "presets" },
    { label: "Notion", id: "guides-notion" },
    { label: "Hygiene", id: "guides-hygiene" },
    { label: "Troubleshooting", id: "guides-troubleshooting" },
    { label: "Glossary", id: "glossary" },
  ];

  return (
    <aside className="docs-toc">
      <h6 style={{ fontFamily: "var(--mono)", fontSize: 11 }}>ON THIS PAGE</h6>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ── Mobile sidebar toggle (client component) ── */
export { MobileSidebarToggle } from "./mobile-sidebar-toggle";
