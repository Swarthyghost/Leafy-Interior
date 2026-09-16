"use client";

import { use, useEffect, useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import AdminError from "@/components/admin/AdminError";
import BackToProducts from "@/components/admin/BackToProducts";
import { getProductById } from "@/lib/products";
import type { Product } from "@/types";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProductById(id)
      .then((p) => {
        setProduct(p);
        setLoaded(true);
      })
      .catch(() =>
        setError("Couldn't load this product. Check that Firestore is set up and reachable.")
      );
  }, [id]);

  if (error) {
    return (
      <div>
        <BackToProducts />
        <AdminError message={error} />
      </div>
    );
  }

  if (!loaded) return <p className="text-sub text-sm">Loading…</p>;

  if (!product) {
    return (
      <div>
        <BackToProducts />
        <p className="text-sub text-sm">Product not found.</p>
      </div>
    );
  }

  return (
    <div>
      <BackToProducts />
      <h1 className="text-xl font-bold mb-6">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
