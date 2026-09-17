"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import { formatGHS } from "@/lib/format";
import { cartSubtotal, lineItemTotal } from "@/lib/whatsapp";
import { getProductsByCategory } from "@/lib/products";
import { effectivePrice } from "@/lib/pricing";
import type { CartLineItem, Product } from "@/types";

function PotPicker({
  item,
  pots,
  onSelect,
}: {
  item: CartLineItem;
  pots: Product[];
  onSelect: (pot: Product | null) => void;
}) {
  if (item.pot) {
    return (
      <div className="mt-2 flex items-center gap-2 bg-black/20 rounded-xl p-2">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#233318] relative shrink-0">
          {item.pot.image && <Image src={item.pot.image} alt={item.pot.name} fill className="object-cover" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold truncate">{item.pot.name}</p>
          <p className="text-[11px] text-sub">+ {formatGHS(item.pot.priceDelta)}</p>
        </div>
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="text-[11px] text-clay hover:underline shrink-0"
        >
          Remove
        </button>
      </div>
    );
  }

  if (pots.length === 0) return null;

  return (
    <div className="mt-2">
      <p className="text-[11px] text-sub mb-1.5">Add a flower pot?</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {pots.map((pot) => (
          <button
            key={pot.id}
            type="button"
            onClick={() => onSelect(pot)}
            disabled={!pot.inStock}
            className="shrink-0 w-16 text-left disabled:opacity-40"
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#233318] relative">
              {pot.images[0] && <Image src={pot.images[0]} alt={pot.name} fill className="object-cover" />}
            </div>
            <p className="text-[10px] mt-1 truncate">{pot.name}</p>
            <p className="text-[10px] text-lime font-bold">{formatGHS(effectivePrice(pot))}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const setPot = useCartStore((s) => s.setPot);
  const [pots, setPots] = useState<Product[]>([]);

  useEffect(() => {
    if (!isOpen || pots.length > 0) return;
    getProductsByCategory("pots")
      .then(setPots)
      .catch(() => setPots([]));
  }, [isOpen, pots.length]);

  function handleSelectPot(lineId: string, pot: Product | null) {
    setPot(
      lineId,
      pot
        ? {
            productId: pot.id,
            name: pot.name,
            image: pot.images[0] ?? "",
            priceDelta: effectivePrice(pot),
          }
        : undefined
    );
  }

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
                <div key={item.lineId} className="glass p-3">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#233318] relative shrink-0">
                      {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">{item.name}</h4>
                      {item.variant && <p className="text-xs text-sub">{item.variant.label}</p>}
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

                  {item.allowsPotAddon && (
                    <PotPicker
                      item={item}
                      pots={pots}
                      onSelect={(pot) => handleSelectPot(item.lineId, pot)}
                    />
                  )}
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
