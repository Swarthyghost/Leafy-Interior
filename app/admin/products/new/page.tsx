"use client";

import ProductForm from "@/components/admin/ProductForm";
import BackToProducts from "@/components/admin/BackToProducts";

export default function NewProductPage() {
  return (
    <div>
      <BackToProducts />
      <h1 className="text-xl font-bold mb-6">New Product</h1>
      <ProductForm />
    </div>
  );
}
