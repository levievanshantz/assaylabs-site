import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — Assaylabs",
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
      {children}
    </div>
  );
}
