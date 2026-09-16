"use client";

import { usePathname } from "next/navigation";

// The navbar is fixed/transparent so it can float over the hero video on the
// home page. Every other page needs a spacer to push content out from under
// it, since a fixed element no longer takes up space in normal flow.
export default function NavSpacer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <div className="h-[92px]" />;
}
