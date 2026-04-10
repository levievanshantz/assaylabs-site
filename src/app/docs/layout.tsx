import type { Metadata } from "next";
import { DocsSidebar, MobileSidebarToggle } from "./sidebar";

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
    <div className="min-h-screen bg-[hsl(220,15%,6%)] flex">
      <DocsSidebar />
      <MobileSidebarToggle />
      {children}
    </div>
  );
}
