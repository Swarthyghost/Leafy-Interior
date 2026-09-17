"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/products";
import { formatGHS } from "@/lib/format";
import { discountPercent, effectivePrice, isDiscounted } from "@/lib/pricing";
import { categoryLabel } from "@/lib/categories";
import AdminError from "@/components/admin/AdminError";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setProducts(await getProducts());
      } catch {
        setError("Couldn't load products. Check that Firestore is set up and reachable.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="px-4 py-2 rounded-full bg-lime text-bg font-bold text-sm">
          + New Product
        </Link>
      </div>

      {error ? (
        <AdminError message={error} />
      ) : loading ? (
        <p className="text-sub text-sm">Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-sub text-sm">No products yet.</p>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/admin/products/${p.id}`}
              className="glass p-4 flex items-center gap-4 hover:border-lime transition-colors"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#233318] relative shrink-0">
                {p.images[0] && <Image src={p.images[0]} alt={p.name} fill className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{p.name}</p>
                <p className="text-xs text-sub">
                  {categoryLabel(p.category)} ·{" "}
                  {isDiscounted(p) ? (
                    <>
                      <span className="line-through">{formatGHS(p.basePrice)}</span>{" "}
                      {formatGHS(effectivePrice(p))}
                    </>
                  ) : (
                    formatGHS(p.basePrice)
                  )}
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                {isDiscounted(p) && (
                  <span className="px-2 py-1 rounded-full bg-lime/20 text-lime">
                    -{discountPercent(p)}%
                  </span>
                )}
                {p.promoLabel && (
                  <span className="px-2 py-1 rounded-full border border-lime text-lime">{p.promoLabel}</span>
                )}
                {p.featured && <span className="px-2 py-1 rounded-full bg-lime/20 text-lime">Featured</span>}
                {p.topSelling && (
                  <span className="px-2 py-1 rounded-full bg-lime/20 text-lime">Top Selling</span>
                )}
                {!p.inStock && <span className="px-2 py-1 rounded-full bg-clay/20 text-clay">Sold out</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
