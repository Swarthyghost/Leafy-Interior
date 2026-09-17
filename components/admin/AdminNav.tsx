"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { hasAdminPin } from "@/app/actions/admin";

const SESSION_KEY = "leafy-admin-unlocked";

function handleLock() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.reload();
}

export default function AdminNav() {
  const [pinRequired, setPinRequired] = useState(false);

  useEffect(() => {
    hasAdminPin().then(setPinRequired);
  }, []);

  return (
    <div className="flex items-center justify-between mb-8">
      <span className="text-xs uppercase tracking-wider text-sub">Admin Dashboard</span>
      <div className="flex items-center gap-4">
        <Link href="/" target="_blank" className="text-xs text-sub hover:text-text">
          View Store
        </Link>
        {pinRequired && (
          <button onClick={handleLock} className="text-xs text-sub hover:text-text">
            Lock
          </button>
        )}
      </div>
    </div>
  );
}
