import type { Product } from "@/types";

type PricedProduct = Pick<Product, "basePrice" | "onSale" | "salePrice">;

export function isDiscounted(product: PricedProduct): boolean {
  return Boolean(
    product.onSale && typeof product.salePrice === "number" && product.salePrice < product.basePrice
  );
}

/** The price to actually charge — the sale price when a valid discount is active, otherwise basePrice. */
export function effectivePrice(product: PricedProduct): number {
  return isDiscounted(product) ? (product.salePrice as number) : product.basePrice;
}

/** Rounded percentage off, or null when there's no active discount. */
export function discountPercent(product: PricedProduct): number | null {
  if (!isDiscounted(product)) return null;
  return Math.round((1 - (product.salePrice as number) / product.basePrice) * 100);
}
