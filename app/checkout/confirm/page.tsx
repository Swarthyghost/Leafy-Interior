"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { useCheckoutStore } from "@/store/checkout";
import { formatGHS } from "@/lib/format";
import { buildWhatsAppLink, cartSubtotal, lineItemTotal } from "@/lib/whatsapp";

export default function ConfirmPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const customer = useCheckoutStore((s) => s.customer);
  const router = useRouter();

  useEffect(() => {
    if (!customer || items.length === 0) {
      router.replace("/checkout");
    }
  }, [customer, items.length, router]);

  if (!customer || items.length === 0) return null;

  const whatsappLink = buildWhatsAppLink(items, customer);

  return (
    <section className="max-w-[700px] mx-auto w-full px-6 md:px-10 py-14">
      <h1 className="text-2xl font-extrabold mb-2">Review &amp; Confirm</h1>
      <p className="text-sub text-sm mb-8">
        We&apos;ll open WhatsApp with your order ready to send — nothing is charged here.
      </p>

      <div className="glass p-6 mb-6 space-y-4">
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
              {item.pot && <p className="text-xs text-sub">+ Pot ({item.pot.colorName})</p>}
            </div>
            <span className="text-sm font-bold shrink-0">{formatGHS(lineItemTotal(item))}</span>
          </div>
        ))}
        <div className="pt-4 border-t border-line flex justify-between">
          <span className="text-sub text-sm">Subtotal</span>
          <span className="font-extrabold">{formatGHS(cartSubtotal(items))}</span>
        </div>
      </div>

      <div className="glass p-6 mb-8">
        <h3 className="text-sm font-bold mb-3">Delivering to</h3>
        <p className="text-sm">{customer.name}</p>
        <p className="text-sm text-sub">{customer.phone}</p>
        <p className="text-sm text-sub">{customer.address}</p>
        {customer.landmark && <p className="text-sm text-sub">Near: {customer.landmark}</p>}
        <Link href="/checkout" className="inline-block mt-3 text-xs text-lime hover:underline">
          Edit details
        </Link>
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => clearCart()}
        className="flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-[#25D366] text-[#06210f] font-bold text-sm hover:brightness-105 transition-all"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.45 1.34 4.95L2 22l5.2-1.36a9.96 9.96 0 0 0 4.84 1.23h.01c5.52 0 10-4.48 10-10s-4.48-9.87-10.01-9.87Zm5.87 14.24c-.25.7-1.45 1.33-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.68-.63-2.96-1.28-4.89-4.25-5.04-4.45-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.78-.37h.56c.18 0 .42-.03.65.5.25.6.85 2.06.92 2.21.07.15.12.33.02.53-.09.2-.14.32-.28.49-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.06.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.27.36-.22.6-.13.25.09 1.6.75 1.87.88.27.14.45.2.51.32.07.11.07.66-.18 1.35Z" />
        </svg>
        Order via WhatsApp
      </a>
    </section>
  );
}
