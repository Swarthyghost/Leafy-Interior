"use client";

import { useEffect, useState } from "react";

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN;
const SESSION_KEY = "leafy-admin-unlocked";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ADMIN_PIN || sessionStorage.getItem(SESSION_KEY) === "true") {
      setUnlocked(true);
    }
    setChecked(true);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setUnlocked(true);
      setError(null);
    } else {
      setError("Incorrect PIN.");
    }
  }

  if (!checked) return null;

  if (!ADMIN_PIN) {
    return (
      <>
        <div className="mb-6 px-4 py-2.5 rounded-xl bg-clay/20 border border-clay text-clay text-xs text-center">
          No NEXT_PUBLIC_ADMIN_PIN is set — /admin is wide open. Set one before deploying.
        </div>
        {children}
      </>
    );
  }

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto px-6 py-24">
        <h1 className="text-2xl font-extrabold mb-6 text-center">Admin Access</h1>
        <form onSubmit={handleSubmit} className="glass p-6 space-y-4">
          <div>
            <label className="block text-xs text-sub mb-1.5">PIN</label>
            <input
              required
              autoFocus
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
            />
          </div>
          {error && <p className="text-clay text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-text text-bg font-bold text-sm"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
