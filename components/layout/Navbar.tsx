"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useCartStore, useCartCount } from "@/store/cart";
import { useFlyToCartStore } from "@/store/flyToCart";
import { PRODUCT_CATEGORIES } from "@/lib/categories";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  ...PRODUCT_CATEGORIES.map((c) => ({ href: `/shop?type=${c.id}`, label: c.label })),
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
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        scrolled || menuOpen
          ? "bg-bg2/90 backdrop-blur-md border-glass-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav
        className="relative z-20 max-w-[1200px] mx-auto w-full px-6 md:px-10 flex items-center justify-between h-[92px] transition-[filter] duration-300"
        style={{ filter: scrolled || menuOpen ? "none" : "drop-shadow(0 1px 3px rgba(0,0,0,0.55))" }}
      >
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
        <button
          aria-label="Menu"
          className="md:hidden relative w-[18px] h-[18px]"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <motion.g
              animate={{ opacity: menuOpen ? 0 : 1, scale: menuOpen ? 0.7 : 1 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: "50%", originY: "50%" }}
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </motion.g>
            <motion.g
              animate={{ opacity: menuOpen ? 1 : 0, scale: menuOpen ? 1 : 0.7 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: "50%", originY: "50%" }}
            >
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </motion.g>
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-[92px] left-0 right-0 md:hidden bg-bg2/90 backdrop-blur-md border-b border-glass-border px-6 py-4 flex flex-col gap-1 text-sm text-[#D6DBC9] overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:text-lime"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </header>
  );
}
