import type { Product } from "@/types";
import { categoryLabel } from "@/lib/categories";
import ProductCard from "@/components/product/ProductCard";
import FadeIn from "@/components/ui/FadeIn";

export default function TopSelling({ products }: { products: Product[] }) {
  return (
    <section id="shop" className="py-20 md:py-[90px]">
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10">
        <FadeIn className="section-title text-center mb-12">
          <h2 className="text-[30px] font-extrabold">Our Top Selling</h2>
        </FadeIn>

        {products.length === 0 ? (
          <p className="text-center text-sub text-sm">
            No products yet — add some from the admin dashboard.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <FadeIn key={product.id} delay={(i % 6) * 0.06}>
                <ProductCard product={product} subtitle={categoryLabel(product.category)} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
