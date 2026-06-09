"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wordmark } from "@/components/Wordmark";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--paper)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 360, padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <Wordmark />
        </div>
        <div className="mono" style={{ textAlign: "center", marginBottom: 24 }}>
          ACCESS CODE REQUIRED
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Access code"
            autoFocus
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 2,
              background: "var(--paper-2)",
              border: "1px solid var(--rule-soft)",
              color: "var(--ink)",
              fontFamily: "var(--mono)",
              fontSize: 14,
              letterSpacing: "0.04em",
              outline: "none",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ink)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--rule-soft)")}
          />
          {error && (
            <p
              className="mono"
              style={{ color: "var(--ignition-ink)", margin: 0 }}
            >
              Invalid access code.
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn btn--lg"
            style={{ justifyContent: "center", width: "100%", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Verifying…" : "Enter"}
          </button>
        </form>
        <p
          className="mono-meta"
          style={{ textAlign: "center", marginTop: 32, color: "var(--ink-3)" }}
        >
          Request access at assaylabs.com
        </p>
      </div>
    </div>
  );
}
