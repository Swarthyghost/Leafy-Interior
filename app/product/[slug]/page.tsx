import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductBySlug, getPotProducts } from "@/lib/products";

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    product = null;
  }

  if (!product) notFound();

  let pots: Awaited<ReturnType<typeof getPotProducts>> = [];
  if (product.allowsPotAddon) {
    try {
      pots = await getPotProducts();
    } catch {
      pots = [];
    }
  }

  return <ProductDetail product={product} pots={pots} />;
}
