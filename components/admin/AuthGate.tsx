"use client";

import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, ADMIN_UID } from "@/lib/firebase";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSigningIn(false);
    }
  }

  if (loading) {
    return <div className="max-w-md mx-auto px-6 py-24 text-center text-sub text-sm">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24">
        <h1 className="text-2xl font-extrabold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="glass p-6 space-y-4">
          <div>
            <label className="block text-xs text-sub mb-1.5">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
            />
          </div>
          <div>
            <label className="block text-xs text-sub mb-1.5">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
            />
          </div>
          {error && <p className="text-clay text-xs">{error}</p>}
          <button
            type="submit"
            disabled={signingIn}
            className="w-full py-3.5 rounded-full bg-text text-bg font-bold text-sm disabled:opacity-50"
          >
            {signingIn ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  if (!ADMIN_UID || user.uid !== ADMIN_UID) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="text-xl font-bold mb-3">Not authorized</h1>
        <p className="text-sub text-sm mb-6">This account isn&apos;t allowed to access the admin dashboard.</p>
        <button
          onClick={() => signOut(auth)}
          className="px-6 py-2.5 rounded-full border border-glass-border text-sm"
        >
          Sign out
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
