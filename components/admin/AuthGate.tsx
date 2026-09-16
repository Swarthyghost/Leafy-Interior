"use client";

import { useEffect, useState, useTransition } from "react";
import { verifyAdminPin, hasAdminPin } from "@/app/actions/admin";

const SESSION_KEY = "leafy-admin-unlocked";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [pinRequired, setPinRequired] = useState(true);
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function checkSetup() {
      const isRequired = await hasAdminPin();
      setPinRequired(isRequired);
      if (!isRequired || sessionStorage.getItem(SESSION_KEY) === "true") {
        setUnlocked(true);
      }
      setChecked(true);
    }
    checkSetup();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const valid = await verifyAdminPin(pin);
      if (valid) {
        sessionStorage.setItem(SESSION_KEY, "true");
        setUnlocked(true);
        setError(null);
      } else {
        setError("Incorrect PIN.");
      }
    });
  }

  if (!checked) return null;

  if (!pinRequired) {
    return (
      <>
        <div className="mb-6 px-4 py-2.5 rounded-xl bg-clay/20 border border-clay text-clay text-xs text-center">
          No ADMIN_PIN is set — /admin is wide open. Set one before deploying.
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
            disabled={isPending}
            className="w-full py-3.5 rounded-full bg-text text-bg font-bold text-sm disabled:opacity-50"
          >
            {isPending ? "Unlocking..." : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
