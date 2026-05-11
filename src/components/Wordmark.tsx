import Link from "next/link";

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="wordmark">
      <svg className="glyph" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="0.5" y="0.5" width="21" height="21" stroke="currentColor" />
        <path d="M5 16 L11 5 L17 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="7.5" y1="12" x2="14.5" y2="12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="name">
        <b>Assay</b> <span>Labs</span>
      </span>
    </Link>
  );
}
