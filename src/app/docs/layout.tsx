import { DocsSidebar } from "./sidebar";

export const metadata = {
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
      <DocsSidebar />
      <main className="flex-1 min-w-0 px-6 py-10 md:px-12 lg:px-16 max-w-4xl">
        {children}
      </main>
    </div>
  );
}
