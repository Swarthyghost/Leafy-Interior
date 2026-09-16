"use client";

import { useRef } from "react";
import { useCartStore } from "@/store/cart";
import { useFlyToCartStore } from "@/store/flyToCart";
import { effectivePrice } from "@/lib/pricing";
import type { Product } from "@/types";

export default function QuickAddButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const launch = useFlyToCartStore((s) => s.launch);
  const btnRef = useRef<HTMLButtonElement>(null);

  function handleClick() {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0] ?? "",
      basePrice: effectivePrice(product),
      quantity: 1,
      variant: product.variants[0],
    });

    if (btnRef.current && product.images[0]) {
      launch(product.images[0], btnRef.current.getBoundingClientRect());
    }
  }

  return (
    <button
      ref={btnRef}
      aria-label={`Add ${product.name} to cart`}
      onClick={handleClick}
      disabled={!product.inStock}
      className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center shrink-0 hover:border-lime hover:text-lime transition-colors disabled:opacity-40"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 6h15l-1.5 9h-12z" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
    </button>
  );
}
