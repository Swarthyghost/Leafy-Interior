import type { Product, Category } from "@/types";
import ProductCard from "@/components/product/ProductCard";

function subtitleFor(product: Product, categories: Category[]): string {
  const category = categories.find((c) => c.id === product.categoryId);
  return category?.name ?? "";
}

export default function TopSelling({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  return (
    <section id="shop" className="py-20 md:py-[90px]">
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10">
        <div className="section-title text-center mb-12">
          <h2 className="text-[30px] font-extrabold">Our Top Selling</h2>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-sub text-sm">
            No products yet — add some from the admin dashboard.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} subtitle={subtitleFor(product, categories)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
