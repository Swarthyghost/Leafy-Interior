export type ProductCategory = "flowers" | "pots" | "figurines";

export interface ProductVariant {
  id: string;
  label: string;
  priceDelta: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  basePrice: number;
  images: string[];
  featured: boolean;
  inStock: boolean;
  variants: ProductVariant[];
  allowsPotAddon: boolean;
  onSale?: boolean;
  salePrice?: number;
  promoLabel?: string;
}

/** A real pot product added alongside a plant, at that pot's own price. */
export interface PotSelection {
  productId: string;
  name: string;
  image: string;
  priceDelta: number;
}

export interface CartLineItem {
  lineId: string;
  productId: string;
  name: string;
  image: string;
  basePrice: number;
  quantity: number;
  variant?: ProductVariant;
  pot?: PotSelection;
  /** Whether this item can still have a pot added, offered from the real Pots catalog. */
  allowsPotAddon?: boolean;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
}
