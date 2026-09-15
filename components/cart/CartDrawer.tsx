"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatGHS } from "@/lib/format";
import { cartSubtotal, lineItemTotal } from "@/lib/whatsapp";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-bg2 border-l border-glass-border flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-line">
              <h2 className="font-bold text-lg">Your Cart</h2>
              <button onClick={closeCart} aria-label="Close cart" className="text-sub hover:text-text">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 && (
                <p className="text-sub text-sm text-center mt-10">Your cart is empty.</p>
              )}
              {items.map((item) => (
                <div key={item.lineId} className="glass p-3 flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#233318] relative shrink-0">
                    {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold truncate">{item.name}</h4>
                    {item.variant && <p className="text-xs text-sub">{item.variant.label}</p>}
                    {item.pot && (
                      <p className="text-xs text-sub">
                        + Pot: {item.pot.name}
                        {item.pot.colorName ? ` (${item.pot.colorName}${item.pot.sizeName ? ` / ${item.pot.sizeName}` : ""})` : ""}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 border border-glass-border rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-sub hover:text-text"
                        >
                          −
                        </button>
                        <span className="text-xs w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-sub hover:text-text"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold">{formatGHS(lineItemTotal(item))}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.lineId)}
                    aria-label="Remove item"
                    className="text-sub hover:text-clay self-start"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t border-line">
              <div className="flex justify-between mb-4 text-sm">
                <span className="text-sub">Subtotal</span>
                <span className="font-bold text-base">{formatGHS(cartSubtotal(items))}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className={`block text-center w-full py-3.5 rounded-full font-bold text-sm transition-colors ${
                  items.length === 0
                    ? "bg-glass-border text-sub pointer-events-none"
                    : "bg-text text-bg hover:bg-lime"
                }`}
              >
                Proceed
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
