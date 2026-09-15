export type CategoryType = "plant" | "pot" | "figurine-home" | "figurine-office";

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: CategoryType;
  coverImageUrl: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  priceDelta: number;
  stock: number;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface SizeOption {
  name: string;
  priceDelta: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  basePrice: number;
  images: string[];
  featured: boolean;
  inStock: boolean;
  variants: ProductVariant[];
  allowsPotAddon: boolean;
  colorOptions?: ColorOption[];
  sizeOptions?: SizeOption[];
}

export interface PotSelection {
  productId: string;
  name: string;
  image: string;
  colorName?: string;
  colorHex?: string;
  sizeName?: string;
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
