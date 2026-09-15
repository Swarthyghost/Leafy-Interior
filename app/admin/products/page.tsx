"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, getProducts } from "@/lib/products";
import { formatGHS } from "@/lib/format";
import type { Category, Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [p, c] = await Promise.all([getProducts(), getCategories()]);
      setProducts(p);
      setCategories(c);
      setLoading(false);
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

      {loading ? (
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
                  {categories.find((c) => c.id === p.categoryId)?.name ?? "Uncategorized"} ·{" "}
                  {formatGHS(p.basePrice)}
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                {p.featured && <span className="px-2 py-1 rounded-full bg-lime/20 text-lime">Featured</span>}
                {!p.inStock && <span className="px-2 py-1 rounded-full bg-clay/20 text-clay">Sold out</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
