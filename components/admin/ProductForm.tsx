"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/admin/ImageUploader";
import AdminError from "@/components/admin/AdminError";
import { createProduct, updateProduct, deleteProduct } from "@/lib/products";
import { discountPercent } from "@/lib/pricing";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import { slugify } from "@/lib/slugify";
import type { Product, ProductVariant } from "@/types";

type FormState = Omit<Product, "id">;

function emptyProduct(): FormState {
  return {
    name: "",
    slug: "",
    category: PRODUCT_CATEGORIES[0].id,
    description: "",
    basePrice: 0,
    images: [],
    featured: false,
    inStock: true,
    variants: [],
    allowsPotAddon: false,
    onSale: false,
    salePrice: undefined,
    promoLabel: "",
  };
}

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(product ?? emptyProduct());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(product));

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const cleanSlug = slugify(form.slug) || slugify(form.name);
      const payload = { ...form, slug: cleanSlug };
      if (product) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
      }
      setForm(payload);
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Couldn't save this product. Check that Firestore is set up and reachable.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!product || !confirm("Delete this product?")) return;
    try {
      await deleteProduct(product.id);
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Couldn't delete this product. Check that Firestore is set up and reachable.");
    }
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
              onChange={(e) => {
                const name = e.target.value;
                setForm((f) => ({
                  ...f,
                  name,
                  slug: slugTouched ? f.slug : slugify(name),
                }));
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
            />
          </div>
          <div>
            <label className="block text-xs text-sub mb-1.5">Slug</label>
            <input
              required
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setForm({ ...form, slug: e.target.value });
              }}
              onBlur={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
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
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })}
              className="w-full px-3 py-2.5 rounded-xl border border-glass-border bg-bg2 text-sm outline-none"
            >
              {PRODUCT_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
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
          {form.category === "flowers" && (
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

        {form.category === "flowers" && form.allowsPotAddon && (
          <p className="text-xs text-sub pt-3 border-t border-line">
            Shoppers will be able to add any product from the <strong>Pots</strong> category
            alongside this one, at that pot&apos;s own price — add pot products under the Pots
            category to make them available here.
          </p>
        )}
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

      <div className="glass p-5 space-y-3">
        <h3 className="text-sm font-bold mb-1">Promo &amp; Discount</h3>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.onSale ?? false}
            onChange={(e) => setForm({ ...form, onSale: e.target.checked })}
            className="w-4 h-4 accent-lime"
          />
          On sale
        </label>

        {form.onSale && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
            <div>
              <label className="block text-xs text-sub mb-1.5">Sale Price (GH₵)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.salePrice ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    salePrice: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2.5 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
              />
            </div>
            <p className="text-xs text-sub pb-2.5">
              {(() => {
                const pct = discountPercent(form);
                if (pct === null) return "Enter a sale price lower than the base price to see the discount.";
                return `${pct}% off ${form.basePrice ? `(was GH₵ ${form.basePrice})` : ""}`;
              })()}
            </p>
          </div>
        )}

        <div>
          <label className="block text-xs text-sub mb-1.5">Promo Label (optional)</label>
          <input
            placeholder="e.g. New, Bestseller, Limited Stock"
            value={form.promoLabel ?? ""}
            onChange={(e) => setForm({ ...form, promoLabel: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
          />
        </div>
      </div>

      {error && <AdminError message={error} />}

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
