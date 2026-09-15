"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const LINKS = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
      <div className="flex gap-2">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-full text-sm border ${
              pathname.startsWith(link.href)
                ? "bg-lime text-bg border-lime"
                : "border-glass-border text-sub"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <button onClick={() => signOut(auth)} className="text-xs text-sub hover:text-text">
        Sign out
      </button>
    </div>
  );
}
