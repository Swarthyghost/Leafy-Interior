import type { CartLineItem, CustomerInfo } from "@/types";
import { formatGHS } from "./format";

export const STORE_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_STORE_WHATSAPP_NUMBER ?? "233000000000";

export function lineItemTotal(item: CartLineItem): number {
  const variantDelta = item.variant?.priceDelta ?? 0;
  const potDelta = item.pot?.priceDelta ?? 0;
  return (item.basePrice + variantDelta + potDelta) * item.quantity;
}

export function cartSubtotal(items: CartLineItem[]): number {
  return items.reduce((sum, item) => sum + lineItemTotal(item), 0);
}

export function buildWhatsAppMessage(items: CartLineItem[], customer: CustomerInfo): string {
  const lines: string[] = [];
  lines.push("Hello Leafy Interior, I'd like to place an order:");
  lines.push("");

  items.forEach((item, i) => {
    let line = `${i + 1}. ${item.name}`;
    if (item.variant) line += ` (${item.variant.label})`;
    line += ` x${item.quantity} - ${formatGHS(lineItemTotal(item))}`;
    lines.push(line);
    if (item.pot) {
      lines.push(`   + Pot: ${item.pot.name}`);
    }
  });

  lines.push("");
  lines.push(`Subtotal: ${formatGHS(cartSubtotal(items))}`);
  lines.push("");
  lines.push(`Name: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  lines.push(`Address: ${customer.address}`);
  if (customer.landmark) lines.push(`Nearest Landmark: ${customer.landmark}`);

  return lines.join("\n");
}

export function buildWhatsAppLink(items: CartLineItem[], customer: CustomerInfo): string {
  const message = buildWhatsAppMessage(items, customer);
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
