"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { Product, ProductVariant, ColorOption, SizeOption } from "@/types";
import { formatGHS } from "@/lib/format";
import { useCartStore } from "@/store/cart";
import { useFlyToCartStore } from "@/store/flyToCart";

export default function ProductDetail({ product, pots }: { product: Product; pots: Product[] }) {
  const [activeImage, setActiveImage] = useState(0);
  const [variant, setVariant] = useState<ProductVariant | undefined>(product.variants[0]);
  const [wantsPot, setWantsPot] = useState(false);
  const [selectedPot, setSelectedPot] = useState<Product | null>(pots[0] ?? null);
  const [color, setColor] = useState<ColorOption | undefined>(pots[0]?.colorOptions?.[0]);
  const [size, setSize] = useState<SizeOption | undefined>(pots[0]?.sizeOptions?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const imgRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const launch = useFlyToCartStore((s) => s.launch);

  const potTotal = wantsPot && selectedPot ? selectedPot.basePrice + (size?.priceDelta ?? 0) : 0;
  const unitPrice = product.basePrice + (variant?.priceDelta ?? 0) + potTotal;
  const total = unitPrice * quantity;

  const potThumbnails = useMemo(() => pots.slice(0, 8), [pots]);

  function selectPot(pot: Product) {
    setSelectedPot(pot);
    setColor(pot.colorOptions?.[0]);
    setSize(pot.sizeOptions?.[0]);
  }

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[activeImage] ?? product.images[0] ?? "",
      basePrice: product.basePrice,
      quantity,
      variant,
      pot:
        wantsPot && selectedPot
          ? {
              productId: selectedPot.id,
              name: selectedPot.name,
              image: selectedPot.images[0] ?? "",
              colorName: color?.name,
              colorHex: color?.hex,
              sizeName: size?.name,
              priceDelta: selectedPot.basePrice + (size?.priceDelta ?? 0),
            }
          : undefined,
    });

    if (imgRef.current) {
      launch(product.images[activeImage] ?? product.images[0] ?? "", imgRef.current.getBoundingClientRect());
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
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
      </div>

      <div>
        <h1 className="text-3xl font-extrabold mb-3">{product.name}</h1>
        <p className="text-sub text-sm mb-5 leading-relaxed">{product.description}</p>
        <div className="text-2xl font-extrabold mb-6">{formatGHS(unitPrice)}</div>

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
              <span className="text-sm font-bold">Add a pot?</span>
            </label>

            {wantsPot && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {potThumbnails.map((pot) => (
                    <button
                      key={pot.id}
                      onClick={() => selectPot(pot)}
                      className={`w-14 h-14 rounded-xl overflow-hidden relative bg-[#233318] border-2 ${
                        selectedPot?.id === pot.id ? "border-lime" : "border-transparent"
                      }`}
                      title={pot.name}
                    >
                      {pot.images[0] && <Image src={pot.images[0]} alt={pot.name} fill className="object-cover" />}
                    </button>
                  ))}
                </div>

                {selectedPot?.colorOptions && selectedPot.colorOptions.length > 0 && (
                  <div>
                    <p className="text-xs text-sub mb-2">Colour</p>
                    <div className="flex gap-2">
                      {selectedPot.colorOptions.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setColor(c)}
                          title={c.name}
                          style={{ backgroundColor: c.hex }}
                          className={`w-7 h-7 rounded-full border-2 ${
                            color?.name === c.name ? "border-lime" : "border-glass-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedPot?.sizeOptions && selectedPot.sizeOptions.length > 0 && (
                  <div>
                    <p className="text-xs text-sub mb-2">Size</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPot.sizeOptions.map((s) => (
                        <button
                          key={s.name}
                          onClick={() => setSize(s)}
                          className={`px-3 py-1.5 rounded-full text-xs border ${
                            size?.name === s.name
                              ? "bg-lime text-bg border-lime"
                              : "border-glass-border text-sub"
                          }`}
                        >
                          {s.name}
                          {s.priceDelta > 0 ? ` (+${formatGHS(s.priceDelta)})` : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
      </div>
    </div>
  );
}
