import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

export default function Hero({ spotlightProduct }: { spotlightProduct: Product | null }) {
  return (
    <div className="relative pb-16">
      <div className="leafy-bg">
        <Image src="/images/hero-leaves.png" alt="" fill priority className="object-cover" />
      </div>

      <section className="relative z-10 pt-8 md:pt-12 pb-8">
        <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10 relative">
          <h1 className="text-[clamp(38px,6vw,72px)] font-extrabold leading-[1.05] max-w-[9ch]">
            Style Naturally, Zero Upkeep
          </h1>
          <p className="text-sub max-w-[36ch] mt-4 mb-7 text-[14.5px]">
            Faux plants, flower pots and figurine decor that make every room in Accra feel fresh,
            styled and alive.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/shop" className="bg-text text-bg px-[26px] py-3.5 rounded-full font-bold text-sm">
              Explore
            </Link>
            <a href="#trendy" className="flex items-center gap-2.5 text-sm font-semibold">
              <span className="w-[34px] h-[34px] rounded-full border border-glass-border flex items-center justify-center">
                ▶
              </span>
              See it styled
            </a>
          </div>

          {spotlightProduct && (
            <div className="glass p-4 w-[250px] absolute -top-1.5 right-10 z-10 hidden lg:block">
              <div className="aspect-square rounded-2xl overflow-hidden mb-3.5 bg-[#233318] relative">
                {spotlightProduct.images[0] && (
                  <Image src={spotlightProduct.images[0]} alt={spotlightProduct.name} fill className="object-cover" />
                )}
              </div>
              <div className="text-[11px] text-lime uppercase tracking-wider mb-1">Bestseller</div>
              <h4 className="text-base font-bold mb-3">{spotlightProduct.name}</h4>
              <Link
                href={`/product/${spotlightProduct.slug}`}
                className="block w-full text-center py-2.5 rounded-full bg-text text-bg font-bold text-[13px]"
              >
                Buy Now
              </Link>
            </div>
          )}

          <div className="glass p-4 w-[260px] relative z-10 mt-16 ml-auto hidden lg:block">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C8A6E] to-[#3F4A32] shrink-0" />
              <div>
                <b className="text-[13.5px] block">Abena O.</b>
                <div className="text-lime text-[11px]">★★★★★</div>
              </div>
            </div>
            <p className="text-[12.5px] text-sub">
              &ldquo;Looks so real my guests always ask where I bought it — no watering, ever.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
