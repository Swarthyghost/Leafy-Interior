"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useCheckoutStore } from "@/store/checkout";
import { formatGHS } from "@/lib/format";
import { cartSubtotal, lineItemTotal } from "@/lib/whatsapp";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const setCustomer = useCheckoutStore((s) => s.setCustomer);
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCustomer({ name, phone, address, landmark: landmark || undefined });
    router.push("/checkout/confirm");
  }

  if (items.length === 0) {
    return (
      <section className="max-w-[600px] mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-extrabold mb-3">Your cart is empty</h1>
        <p className="text-sub text-sm mb-8">Add something lovely before checking out.</p>
        <Link href="/shop" className="inline-block px-8 py-3.5 rounded-full bg-text text-bg font-bold text-sm">
          Go to Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-[1000px] mx-auto w-full px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10">
      <div>
        <h1 className="text-2xl font-extrabold mb-6">Your Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4 glass p-6">
          <div>
            <label className="block text-xs text-sub mb-1.5">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-xs text-sub mb-1.5">Phone</label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
              placeholder="e.g. 024 123 4567"
            />
          </div>
          <div>
            <label className="block text-xs text-sub mb-1.5">Address</label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime resize-none"
              placeholder="Delivery address"
            />
          </div>
          <div>
            <input
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border/40 bg-transparent text-sub text-sm outline-none focus:border-lime placeholder:text-sub/60"
              placeholder="Nearest Landmark — e.g. Accra Mall"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-text text-bg font-bold text-sm hover:bg-lime transition-colors"
          >
            Review Order
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <div className="glass p-5 space-y-4">
          {items.map((item) => (
            <div key={item.lineId} className="flex gap-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#233318] relative shrink-0">
                {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">
                  {item.name} <span className="text-sub font-normal">x{item.quantity}</span>
                </p>
                {item.variant && <p className="text-xs text-sub">{item.variant.label}</p>}
              </div>
              <span className="text-sm font-bold shrink-0">{formatGHS(lineItemTotal(item))}</span>
            </div>
          ))}
          <div className="pt-4 border-t border-line flex justify-between">
            <span className="text-sub text-sm">Subtotal</span>
            <span className="font-extrabold">{formatGHS(cartSubtotal(items))}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
