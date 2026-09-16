"use client";

const SESSION_KEY = "leafy-admin-unlocked";

function handleLock() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.reload();
}

export default function AdminNav() {
  return (
    <div className="flex items-center justify-between mb-8">
      <span className="text-xs uppercase tracking-wider text-sub">Admin Dashboard</span>
      {process.env.NEXT_PUBLIC_ADMIN_PIN && (
        <button onClick={handleLock} className="text-xs text-sub hover:text-text">
          Lock
        </button>
      )}
    </div>
  );
}
