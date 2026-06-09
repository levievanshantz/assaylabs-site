import type { Metadata } from "next";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { DocsSidebar, MobileSidebarToggle, DocsToc } from "./sidebar";

export const metadata: Metadata = {
  title: "Documentation — AssayLabs",
  description:
    "Learn how to set up and use Assay, the intelligence ledger for product teams.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar active="docs" />

      <main className="route" id="docs">
        <div className="route-tag">
          <div className="route-tag-inner">
            <span className="mono">/docs&nbsp;&nbsp;·&nbsp;&nbsp;PRODUCT REFERENCE</span>
            <span className="mono-meta">2026-04-20</span>
          </div>
        </div>

        <MobileSidebarToggle />

        <div className="page docs-shell">
          <DocsSidebar />
          <article className="docs-content">{children}</article>
          <DocsToc />
        </div>

        <Footer />
      </main>
    </>
  );
}
