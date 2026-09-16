import Hero from "@/components/home/Hero";
import TrendyPicks from "@/components/home/TrendyPicks";
import TopSelling from "@/components/home/TopSelling";
import Reviews from "@/components/home/Reviews";
import SpotlightBanner from "@/components/home/SpotlightBanner";
import { getFeaturedProducts, getProducts } from "@/lib/products";
import type { Product } from "@/types";

async function safeLoad<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function Home() {
  const [products, featured] = await Promise.all([
    safeLoad<Product[]>(getProducts, []),
    safeLoad<Product[]>(getFeaturedProducts, []),
  ]);

  const spotlightProduct = featured[0] ?? products[0] ?? null;
  const topSelling = (featured.length ? featured : products).slice(0, 6);

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
      <Reviews />
      <SpotlightBanner />
    </>
  );
}
