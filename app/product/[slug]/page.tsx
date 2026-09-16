import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductBySlug } from "@/lib/products";

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    product = null;
  }

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
