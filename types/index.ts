export type ProductCategory = "flowers" | "pots" | "figurines";

export interface ProductVariant {
  id: string;
  label: string;
  priceDelta: number;
  stock: number;
}

/** A colour choice offered when adding a pot to a plant, each with its own price. */
export interface PotColorOption {
  name: string;
  hex: string;
  priceDelta: number;
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
  potColorOptions?: PotColorOption[];
  onSale?: boolean;
  salePrice?: number;
  promoLabel?: string;
}

export interface PotSelection {
  colorName: string;
  colorHex: string;
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
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
}
