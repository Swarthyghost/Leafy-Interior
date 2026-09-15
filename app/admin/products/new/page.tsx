"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import { getCategories } from "@/lib/products";
import type { Category } from "@/types";

export default function NewProductPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  if (!categories) return <p className="text-sub text-sm">Loading…</p>;

  if (categories.length === 0) {
    return <p className="text-sub text-sm">Create a category first before adding products.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">New Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
