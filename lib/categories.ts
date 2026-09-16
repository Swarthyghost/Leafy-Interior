import type { ProductCategory } from "@/types";

export const PRODUCT_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "flowers", label: "Flowers" },
  { id: "pots", label: "Pots" },
  { id: "figurines", label: "Figurines & Ornaments" },
];

export function categoryLabel(category: ProductCategory): string {
  return PRODUCT_CATEGORIES.find((c) => c.id === category)?.label ?? category;
}
