"use client";

import { useState } from "react";
import { NAV_SECTIONS } from "./sidebar";

export function MobileSidebarToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — visible only on small screens (<= 1024px) */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle docs navigation"
        style={{
          position: "fixed",
          top: 72,
          left: 16,
          zIndex: 60,
          width: 40,
          height: 40,
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--paper)",
          border: "1px solid var(--rule)",
          borderRadius: 2,
          color: "var(--ink)",
          cursor: "pointer",
        }}
        className="docs-mobile-toggle"
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
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 55,
            background: "color-mix(in oklch, var(--ink) 60%, transparent)",
          }}
          className="docs-mobile-backdrop"
        />
      )}

      {/* Slide-out sidebar */}
      <aside
        className="docs-mobile-panel"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 56,
          height: "100vh",
          width: 260,
          overflowY: "auto",
          background: "var(--paper)",
          borderRight: "1px solid var(--rule)",
          padding: "24px 20px",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.2s ease",
        }}
      >
        <div className="mono" style={{ marginBottom: 20 }}>
          ASSAY · DOCS
        </div>

        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="grp" style={{ marginBottom: 20 }}>
            <h6
              style={{
                margin: "0 0 8px",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                fontWeight: 500,
              }}
            >
              {section.title}
            </h6>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {section.links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "block",
                      padding: "6px 0",
                      fontSize: 14,
                      color: "var(--ink-2)",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Toggle visibility via media query in inline style tag */}
      <style>{`
        @media (max-width: 1024px) {
          .docs-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .docs-mobile-panel,
          .docs-mobile-backdrop { display: none !important; }
        }
      `}</style>
    </>
  );
}
