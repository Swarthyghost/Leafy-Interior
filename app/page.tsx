import Hero from "@/components/home/Hero";
import TrendyPicks from "@/components/home/TrendyPicks";
import TopSelling from "@/components/home/TopSelling";
import Reviews from "@/components/home/Reviews";
import SpotlightBanner from "@/components/home/SpotlightBanner";
import { getFeaturedProducts, getProducts } from "@/lib/products";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import type { Product } from "@/types";

// Products change via /admin at any time, so this page must always fetch
// fresh from Firestore rather than being statically cached at build time.
export const dynamic = "force-dynamic";

async function safeLoad<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

/**
 * One representative product per category — an admin's "Show in Top Selling"
 * pick wins for that category; otherwise fall back to featured, then in-stock.
 */
function highlightPerCategory(products: Product[]): Product[] {
  return PRODUCT_CATEGORIES.map(({ id }) => {
    const inCategory = products.filter((p) => p.category === id);
    if (inCategory.length === 0) return null;
    return (
      inCategory.find((p) => p.topSelling) ??
      inCategory.find((p) => p.featured) ??
      inCategory.find((p) => p.inStock) ??
      inCategory[0]
    );
  }).filter((p): p is Product => p !== null);
}

export default async function Home() {
  const [products, featured] = await Promise.all([
    safeLoad<Product[]>(getProducts, []),
    safeLoad<Product[]>(getFeaturedProducts, []),
  ]);

  const spotlightProduct = featured[0] ?? products[0] ?? null;
  const topSelling = highlightPerCategory(products);

  const trendyPanels = products.slice(0, 2).map((product) => ({
    product,
    description: product.allowsPotAddon
      ? "Pick any plant, then choose a pot colour — price adjusts as you go."
      : "Matte, glazed and terracotta finishes — sold solo or as a pairing.",
  }));

  return (
    <>
      <Hero spotlightProduct={spotlightProduct} />
      <TrendyPicks panels={trendyPanels} />
      <TopSelling products={topSelling} />
      <SpotlightBanner />
      <Reviews />
    </>
  );
}
