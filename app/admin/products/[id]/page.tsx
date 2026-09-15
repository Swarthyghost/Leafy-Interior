"use client";

import { use, useEffect, useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import { getCategories, getProductById } from "@/lib/products";
import type { Category, Product } from "@/types";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([getCategories(), getProductById(id)]).then(([c, p]) => {
      setCategories(c);
      setProduct(p);
      setLoaded(true);
    });
  }, [id]);

  if (!loaded || !categories) return <p className="text-sub text-sm">Loading…</p>;

  if (!product) return <p className="text-sub text-sm">Product not found.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Edit Product</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
