"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { Product, ProductVariant } from "@/types";
import { formatGHS } from "@/lib/format";
import { discountPercent, effectivePrice, isDiscounted } from "@/lib/pricing";
import { useCartStore } from "@/store/cart";
import { useFlyToCartStore } from "@/store/flyToCart";

export default function ProductDetail({ product, pots }: { product: Product; pots: Product[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [variant, setVariant] = useState<ProductVariant | undefined>(product.variants[0]);
  const [wantsPot, setWantsPot] = useState(false);
  const [selectedPot, setSelectedPot] = useState<Product | null>(pots[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const imgRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const launch = useFlyToCartStore((s) => s.launch);

  const productOnSale = isDiscounted(product);
  const productPct = discountPercent(product);
  const potTotal = wantsPot && selectedPot ? effectivePrice(selectedPot) : 0;
  const unitPrice = effectivePrice(product) + (variant?.priceDelta ?? 0) + potTotal;
  const total = unitPrice * quantity;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[activeImage] ?? product.images[0] ?? "",
      basePrice: effectivePrice(product),
      quantity,
      variant,
      pot:
        wantsPot && selectedPot
          ? {
              productId: selectedPot.id,
              name: selectedPot.name,
              image: selectedPot.images[0] ?? "",
              priceDelta: effectivePrice(selectedPot),
            }
          : undefined,
      allowsPotAddon: product.allowsPotAddon,
    });

    if (imgRef.current) {
      launch(product.images[activeImage] ?? product.images[0] ?? "", imgRef.current.getBoundingClientRect());
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div ref={imgRef} className="aspect-square rounded-[22px] overflow-hidden bg-[#233318] relative mb-3">
          {product.images[activeImage] && (
            <Image src={product.images[activeImage]} alt={product.name} fill className="object-cover" />
          )}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 rounded-xl overflow-hidden relative bg-[#233318] border ${
                  i === activeImage ? "border-lime" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {(productOnSale || product.promoLabel) && (
          <div className="flex gap-2 mb-3">
            {productOnSale && (
              <span className="bg-lime text-bg text-xs font-bold px-2.5 py-1 rounded-full">
                -{productPct}%
              </span>
            )}
            {product.promoLabel && (
              <span className="border border-lime text-lime text-xs px-2.5 py-1 rounded-full">
                {product.promoLabel}
              </span>
            )}
          </div>
        )}
        <h1 className="text-3xl font-extrabold mb-3">{product.name}</h1>
        <p className="text-sub text-sm mb-5 leading-relaxed">{product.description}</p>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-2xl font-extrabold">{formatGHS(unitPrice)}</span>
          {productOnSale && (
            <span className="text-base text-sub line-through">
              {formatGHS(product.basePrice + (variant?.priceDelta ?? 0) + potTotal)}
            </span>
          )}
        </div>

        {product.variants.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-2.5">Options</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariant(v)}
                  disabled={v.stock <= 0}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors disabled:opacity-40 ${
                    variant?.id === v.id
                      ? "bg-lime text-bg border-lime"
                      : "border-glass-border text-sub hover:text-text"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.allowsPotAddon && pots.length > 0 && (
          <div className="mb-6 glass p-5">
            <label className="flex items-center gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={wantsPot}
                onChange={(e) => setWantsPot(e.target.checked)}
                className="w-4 h-4 accent-lime"
              />
              <span className="text-sm font-bold">Add a flower pot?</span>
            </label>

            {wantsPot && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {pots.map((pot) => (
                  <button
                    key={pot.id}
                    onClick={() => setSelectedPot(pot)}
                    disabled={!pot.inStock}
                    className={`shrink-0 w-20 text-left rounded-xl p-1.5 border-2 disabled:opacity-40 ${
                      selectedPot?.id === pot.id ? "border-lime" : "border-transparent"
                    }`}
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#233318] relative">
                      {pot.images[0] && (
                        <Image src={pot.images[0]} alt={pot.name} fill className="object-cover" />
                      )}
                    </div>
                    <p className="text-[11px] mt-1 truncate">{pot.name}</p>
                    <p className="text-[11px] text-lime font-bold">{formatGHS(effectivePrice(pot))}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-3 border border-glass-border rounded-full px-3 py-2">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-5 text-center text-sub">
              −
            </button>
            <span className="text-sm w-4 text-center">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="w-5 text-center text-sub">
              +
            </button>
          </div>
          <span className="text-sm text-sub">Total: {formatGHS(total)}</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full md:w-auto px-10 py-4 rounded-full bg-text text-bg font-bold text-sm hover:bg-lime transition-colors disabled:opacity-40"
        >
          {!product.inStock ? "Sold Out" : added ? "Added!" : "Add to Cart"}
        </button>
      </motion.div>
    </div>
  );
}
