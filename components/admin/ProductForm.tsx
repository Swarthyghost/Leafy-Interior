"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";
import { createProduct, updateProduct, deleteProduct } from "@/lib/products";
import type { Category, ColorOption, Product, ProductVariant, SizeOption } from "@/types";

type FormState = Omit<Product, "id">;

function emptyProduct(categories: Category[]): FormState {
  return {
    name: "",
    slug: "",
    categoryId: categories[0]?.id ?? "",
    description: "",
    basePrice: 0,
    images: [],
    featured: false,
    inStock: true,
    variants: [],
    allowsPotAddon: false,
    colorOptions: [],
    sizeOptions: [],
  };
}

export default function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(product ?? emptyProduct(categories));
  const [saving, setSaving] = useState(false);

  const activeCategory = categories.find((c) => c.id === form.categoryId);
  const isPotCategory = activeCategory?.type === "pot";

  function updateVariant(index: number, patch: Partial<ProductVariant>) {
    setForm({
      ...form,
      variants: form.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    });
  }

  function addVariant() {
    setForm({
      ...form,
      variants: [
        ...form.variants,
        { id: `v-${Date.now()}`, label: "", priceDelta: 0, stock: 0 },
      ],
    });
  }

  function removeVariant(index: number) {
    setForm({ ...form, variants: form.variants.filter((_, i) => i !== index) });
  }

  function updateColor(index: number, patch: Partial<ColorOption>) {
    setForm({
      ...form,
      colorOptions: (form.colorOptions ?? []).map((c, i) => (i === index ? { ...c, ...patch } : c)),
    });
  }

  function addColor() {
    setForm({ ...form, colorOptions: [...(form.colorOptions ?? []), { name: "", hex: "#c58347" }] });
  }

  function removeColor(index: number) {
    setForm({ ...form, colorOptions: (form.colorOptions ?? []).filter((_, i) => i !== index) });
  }

  function updateSize(index: number, patch: Partial<SizeOption>) {
    setForm({
      ...form,
      sizeOptions: (form.sizeOptions ?? []).map((s, i) => (i === index ? { ...s, ...patch } : s)),
    });
  }

  function addSize() {
    setForm({ ...form, sizeOptions: [...(form.sizeOptions ?? []), { name: "", priceDelta: 0 }] });
  }

  function removeSize(index: number) {
    setForm({ ...form, sizeOptions: (form.sizeOptions ?? []).filter((_, i) => i !== index) });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (product) {
        await updateProduct(product.id, form);
      } else {
        await createProduct(form);
      }
      router.push("/admin/products");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!product || !confirm("Delete this product?")) return;
    await deleteProduct(product.id);
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="glass p-5 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-sub mb-1.5">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
            />
          </div>
          <div>
            <label className="block text-xs text-sub mb-1.5">Slug</label>
            <input
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-sub mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-sub mb-1.5">Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-glass-border bg-bg2 text-sm outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-sub mb-1.5">Base Price (GH₵)</label>
            <input
              required
              type="number"
              min={0}
              step={0.01}
              value={form.basePrice}
              onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })}
              className="w-full px-3 py-2.5 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-sub mb-1.5">Images</label>
          <ImageUploader images={form.images} onChange={(images) => setForm({ ...form, images })} />
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-lime"
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={form.inStock}
              onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
              className="w-4 h-4 accent-lime"
            />
            In Stock
          </label>
          {!isPotCategory && (
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.allowsPotAddon}
                onChange={(e) => setForm({ ...form, allowsPotAddon: e.target.checked })}
                className="w-4 h-4 accent-lime"
              />
              Allows pot add-on
            </label>
          )}
        </div>
      </div>

      <div className="glass p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Variants</h3>
          <button type="button" onClick={addVariant} className="text-xs text-lime">
            + Add variant
          </button>
        </div>
        <div className="space-y-2">
          {form.variants.map((v, i) => (
            <div key={v.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center">
              <input
                placeholder="Label (e.g. Large / Terracotta)"
                value={v.label}
                onChange={(e) => updateVariant(i, { label: e.target.value })}
                className="px-3 py-2 rounded-lg border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
              />
              <input
                type="number"
                placeholder="+/- price"
                value={v.priceDelta}
                onChange={(e) => updateVariant(i, { priceDelta: Number(e.target.value) })}
                className="w-24 px-3 py-2 rounded-lg border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
              />
              <input
                type="number"
                placeholder="Stock"
                value={v.stock}
                onChange={(e) => updateVariant(i, { stock: Number(e.target.value) })}
                className="w-20 px-3 py-2 rounded-lg border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
              />
              <button type="button" onClick={() => removeVariant(i)} className="text-clay text-xs">
                Remove
              </button>
            </div>
          ))}
          {form.variants.length === 0 && <p className="text-xs text-sub">No variants — base price applies.</p>}
        </div>
      </div>

      {isPotCategory && (
        <>
          <div className="glass p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold">Colour Options</h3>
              <button type="button" onClick={addColor} className="text-xs text-lime">
                + Add colour
              </button>
            </div>
            <div className="space-y-2">
              {(form.colorOptions ?? []).map((c, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                  <input
                    placeholder="Colour name"
                    value={c.name}
                    onChange={(e) => updateColor(i, { name: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
                  />
                  <input
                    type="color"
                    value={c.hex}
                    onChange={(e) => updateColor(i, { hex: e.target.value })}
                    className="w-10 h-9 rounded-lg border border-glass-border bg-transparent"
                  />
                  <button type="button" onClick={() => removeColor(i)} className="text-clay text-xs">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold">Size Options</h3>
              <button type="button" onClick={addSize} className="text-xs text-lime">
                + Add size
              </button>
            </div>
            <div className="space-y-2">
              {(form.sizeOptions ?? []).map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                  <input
                    placeholder="Size name"
                    value={s.name}
                    onChange={(e) => updateSize(i, { name: e.target.value })}
                    className="px-3 py-2 rounded-lg border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
                  />
                  <input
                    type="number"
                    placeholder="+price"
                    value={s.priceDelta}
                    onChange={(e) => updateSize(i, { priceDelta: Number(e.target.value) })}
                    className="w-24 px-3 py-2 rounded-lg border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
                  />
                  <button type="button" onClick={() => removeSize(i)} className="text-clay text-xs">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-full bg-text text-bg font-bold text-sm disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Product"}
        </button>
        {product && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-3 rounded-full border border-clay text-clay text-sm"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
