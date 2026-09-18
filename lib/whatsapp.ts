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

export function buildWhatsAppMessage(items: CartLineItem[], customer: CustomerInfo, baseUrl?: string): string {
  const lines: string[] = [];
  lines.push("Hello Leafy Interior, I would like to place an order.");
  lines.push("");
  lines.push("Customer Details:");
  lines.push(`Name: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  lines.push(`Address: ${customer.address}`);
  if (customer.landmark) lines.push(`Nearest Landmark: ${customer.landmark}`);
  lines.push("");
  lines.push("Order Summary:");

  items.forEach((item, i) => {
    if (i > 0) lines.push("");
    let title = `${i + 1}. ${item.name}`;
    if (item.variant) title += ` (${item.variant.label})`;
    title += ` (x${item.quantity})`;
    lines.push(title);
    lines.push(`Price: ${formatGHS(lineItemTotal(item))}`);
    if (item.pot) lines.push(`+ Pot: ${item.pot.name}`);
    if (baseUrl && item.slug) lines.push(`View Product: ${baseUrl}/product/${item.slug}`);
  });

  lines.push("");
  lines.push(`Subtotal: ${formatGHS(cartSubtotal(items))}`);
  lines.push("");
  lines.push("Please confirm my order. Thank you!");

  return lines.join("\n");
}

export function buildWhatsAppLink(items: CartLineItem[], customer: CustomerInfo, baseUrl?: string): string {
  const message = buildWhatsAppMessage(items, customer, baseUrl);
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
