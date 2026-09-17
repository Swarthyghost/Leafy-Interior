"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { PRODUCT_CATEGORIES } from "@/lib/categories";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  ...PRODUCT_CATEGORIES.map((c) => ({ href: `/shop?type=${c.id}`, label: c.label })),
  { href: "/contact", label: "Contact" },
];

const INFO_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/our-story", label: "Our Story" },
  { href: "/delivery-information", label: "Delivery Information" },
  { href: "/return-policy", label: "Return Policy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer id="contact" className="border-t border-line pt-14 pb-6">
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-10 mb-10">
          <div>
            <Logo className="mb-3" />
            <p className="text-sub text-[13.5px] max-w-[32ch] mb-4">
              Faux plants, flower pots and figurine decor for homes and offices across Accra.
            </p>
            <div className="flex gap-3 text-xs text-sub">
              <span>IG</span>
              <span>FB</span>
              <span>WA</span>
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-bold mb-3.5">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.label} className="text-[13.5px] text-sub">
                  <Link href={l.href} className="hover:text-text">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-bold mb-3.5">More Info</h4>
            <ul className="space-y-2 mb-4">
              {INFO_LINKS.map((l) => (
                <li key={l.label} className="text-[13.5px] text-sub">
                  <Link href={l.href} className="hover:text-text">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <form
              className="flex"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 px-4 py-3 rounded-l-full border border-glass-border bg-transparent text-text text-sm outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-r-full bg-lime text-bg font-bold text-[13px] shrink-0"
              >
                {subscribed ? "Thanks!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 pt-6 border-t border-line text-[12.5px] text-[#828C74]">
          <span>Leafy Interior © {new Date().getFullYear()} All rights reserved</span>
          <span>Accra · Ghana</span>
        </div>
      </div>
    </footer>
  );
}
