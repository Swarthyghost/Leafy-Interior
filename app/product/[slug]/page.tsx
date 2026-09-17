import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductBySlug, getProductsByCategory } from "@/lib/products";

export async function generateMetadata(
  { params }: PageProps<"/product/[slug]">,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) {
    return {
      title: "Product Not Found | Leafy Interior Ghana",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.name} | Leafy Interior Ghana`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      url: `https://leafyinteriorghana.com/product/${slug}`,
      images: [
        {
          url: product.images[0] || "",
          width: 800,
          height: 600,
          alt: product.name,
        },
        ...previousImages,
      ],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    product = null;
  }

  if (!product) notFound();

  let pots: Awaited<ReturnType<typeof getProductsByCategory>> = [];
  if (product.allowsPotAddon) {
    try {
      pots = await getProductsByCategory("pots");
    } catch {
      pots = [];
    }
  }

  return <ProductDetail product={product} pots={pots} />;
}
