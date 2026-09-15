"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { useCartStore, useCartCount } from "@/store/cart";
import { useFlyToCartStore } from "@/store/flyToCart";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop Plants" },
  { href: "/shop?type=pot", label: "Pots & Decor" },
  { href: "/shop?type=figurine-home", label: "Figurines" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartCount();
  const setCartIconRect = useFlyToCartStore((s) => s.setCartIconRect);
  const cartBump = useFlyToCartStore((s) => s.cartBump);
  const cartIconRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bumping, setBumping] = useState(false);

  useEffect(() => {
    function updateRect() {
      if (cartIconRef.current) {
        setCartIconRect(cartIconRef.current.getBoundingClientRect());
      }
    }
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [setCartIconRect]);

  useEffect(() => {
    if (cartBump === 0) return;
    setBumping(true);
    const t = setTimeout(() => setBumping(false), 320);
    return () => clearTimeout(t);
  }, [cartBump]);

  return (
    <nav className="relative z-20 max-w-[1200px] mx-auto w-full px-6 md:px-10 flex items-center justify-between h-[92px]">
      <Logo />

      <div className="hidden md:flex items-center gap-8 text-sm text-[#D6DBC9]">
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className="hover:text-lime transition-colors">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-5 text-text">
        <button aria-label="Search" className="hidden sm:block">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button
          ref={cartIconRef}
          aria-label="Cart"
          onClick={openCart}
          className={`relative transition-transform ${bumping ? "scale-125" : "scale-100"}`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6h15l-1.5 9h-12z" />
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-2.5 -right-2.5 bg-lime text-bg text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
        <button aria-label="Menu" className="md:hidden" onClick={() => setMenuOpen((v) => !v)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          className="absolute top-[92px] left-0 right-0 md:hidden glass mx-4 p-4 flex flex-col gap-3 text-sm text-[#D6DBC9] shadow-xl"
          style={{ background: "rgba(15, 27, 12, 0.97)" }}
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-lime">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
