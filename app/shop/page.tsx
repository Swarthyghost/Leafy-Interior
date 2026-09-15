import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getCategories, getProducts } from "@/lib/products";
import type { Category, Product } from "@/types";

async function safeLoad<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

const TYPE_LABELS: Record<string, string> = {
  plant: "Plants",
  pot: "Pots & Decor",
  "figurine-home": "Home Figurines",
  "figurine-office": "Office Figurines",
};

export default async function ShopPage({
  searchParams,
}: PageProps<"/shop">) {
  const params = await searchParams;
  const activeType = typeof params.type === "string" ? params.type : undefined;

  const [products, categories] = await Promise.all([
    safeLoad<Product[]>(getProducts, []),
    safeLoad<Category[]>(getCategories, []),
  ]);

  const categoryIdsForType = activeType
    ? categories.filter((c) => c.type === activeType).map((c) => c.id)
    : null;

  const filtered = categoryIdsForType
    ? products.filter((p) => categoryIdsForType.includes(p.categoryId))
    : products;

  const types = Object.keys(TYPE_LABELS);

  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10">
        <div className="section-title text-center mb-10">
          <h2 className="text-[30px] font-extrabold">Shop</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            href="/shop"
            className={`px-5 py-2 rounded-full text-sm border ${
              !activeType ? "bg-lime text-bg border-lime" : "border-glass-border text-sub"
            }`}
          >
            All
          </Link>
          {types.map((type) => (
            <Link
              key={type}
              href={`/shop?type=${type}`}
              className={`px-5 py-2 rounded-full text-sm border ${
                activeType === type ? "bg-lime text-bg border-lime" : "border-glass-border text-sub"
              }`}
            >
              {TYPE_LABELS[type]}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-sub text-sm">No products found in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => {
              const category = categories.find((c) => c.id === product.categoryId);
              return <ProductCard key={product.id} product={product} subtitle={category?.name} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}
