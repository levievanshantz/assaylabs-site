"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_SECTIONS } from "./sidebar";

export function MobileSidebarToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(220,15%,9%)] border border-[hsl(220,15%,18%)] text-[hsl(220,15%,93%)]"
        aria-label="Toggle docs navigation"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </>
          ) : (
            <>
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </>
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-60 overflow-y-auto
          bg-[hsl(220,15%,9%)] border-r border-[hsl(220,15%,18%)]
          transition-transform duration-200 md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
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
                      onClick={() => setOpen(false)}
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
    </>
  );
}
