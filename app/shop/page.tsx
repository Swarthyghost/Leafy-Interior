import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import FadeIn from "@/components/ui/FadeIn";
import { getProducts } from "@/lib/products";
import { PRODUCT_CATEGORIES, categoryLabel } from "@/lib/categories";
import type { Product, ProductCategory } from "@/types";

async function safeLoad<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

function isProductCategory(value: string): value is ProductCategory {
  return PRODUCT_CATEGORIES.some((c) => c.id === value);
}

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const params = await searchParams;
  const typeParam = typeof params.type === "string" ? params.type : undefined;
  const activeCategory = typeParam && isProductCategory(typeParam) ? typeParam : undefined;

  const products = await safeLoad<Product[]>(getProducts, []);

  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10">
        <FadeIn className="section-title text-center mb-10">
          <h2 className="text-[30px] font-extrabold">Shop</h2>
        </FadeIn>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            href="/shop"
            className={`px-5 py-2 rounded-full text-sm border ${
              !activeCategory ? "bg-lime text-bg border-lime" : "border-glass-border text-sub"
            }`}
          >
            All
          </Link>
          {PRODUCT_CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/shop?type=${c.id}`}
              className={`px-5 py-2 rounded-full text-sm border ${
                activeCategory === c.id ? "bg-lime text-bg border-lime" : "border-glass-border text-sub"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-sub text-sm">No products found in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <FadeIn key={product.id} delay={(i % 8) * 0.05}>
                <ProductCard product={product} subtitle={categoryLabel(product.category)} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
