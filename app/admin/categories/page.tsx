"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/products";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Category, CategoryType } from "@/types";

const TYPES: CategoryType[] = ["plant", "pot", "figurine-home", "figurine-office"];

const emptyForm = { name: "", slug: "", type: "plant" as CategoryType, coverImageUrl: "" };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setCategories(await getCategories());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(category: Category) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
      type: category.type,
      coverImageUrl: category.coverImageUrl,
    });
  }

  function startNew() {
    setEditingId("new");
    setForm(emptyForm);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId && editingId !== "new") {
        await updateCategory(editingId, form);
      } else {
        await createCategory(form);
      }
      setEditingId(null);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(id);
    await load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Categories</h1>
        <button
          onClick={startNew}
          className="px-4 py-2 rounded-full bg-lime text-bg font-bold text-sm"
        >
          + New Category
        </button>
      </div>

      {editingId && (
        <form onSubmit={handleSave} className="glass p-5 mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-3 py-2.5 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
            />
            <input
              required
              placeholder="slug (e.g. flower-pots)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="px-3 py-2.5 rounded-xl border border-glass-border bg-transparent text-sm outline-none focus:border-lime"
            />
          </div>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as CategoryType })}
            className="px-3 py-2.5 rounded-xl border border-glass-border bg-bg2 text-sm outline-none w-full md:w-auto"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div>
            <p className="text-xs text-sub mb-2">Cover Image</p>
            <ImageUploader
              images={form.coverImageUrl ? [form.coverImageUrl] : []}
              onChange={(imgs) => setForm({ ...form, coverImageUrl: imgs[imgs.length - 1] ?? "" })}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-full bg-text text-bg font-bold text-sm disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="px-5 py-2.5 rounded-full border border-glass-border text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-sub text-sm">Loading…</p>
      ) : categories.length === 0 ? (
        <p className="text-sub text-sm">No categories yet.</p>
      ) : (
        <div className="space-y-2">
          {categories.map((c) => (
            <div key={c.id} className="glass p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#233318] relative shrink-0">
                {c.coverImageUrl && <Image src={c.coverImageUrl} alt={c.name} fill className="object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{c.name}</p>
                <p className="text-xs text-sub">
                  /{c.slug} · {c.type}
                </p>
              </div>
              <button onClick={() => startEdit(c)} className="text-xs text-lime">
                Edit
              </button>
              <button onClick={() => handleDelete(c.id)} className="text-xs text-clay">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
