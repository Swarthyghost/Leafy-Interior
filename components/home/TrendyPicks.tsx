import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatGHS } from "@/lib/format";
import { discountPercent, effectivePrice, isDiscounted } from "@/lib/pricing";
import FadeIn from "@/components/ui/FadeIn";

function Panel({ product, description }: { product: Product; description: string }) {
  const onSale = isDiscounted(product);
  const pct = discountPercent(product);

  return (
    <div className="glass relative overflow-hidden aspect-[3/4] flex items-end p-0 w-full">
      <div className="absolute inset-0">
        {product.images[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 45%, rgba(10,18,8,0.4) 68%, rgba(10,18,8,0.85) 90%, rgba(10,18,8,0.94) 100%)",
        }}
      />
      <div className="relative z-10 p-6 md:p-8 w-full">
        {(onSale || product.promoLabel) && (
          <div className="flex gap-2 mb-2">
            {onSale && (
              <span className="bg-lime text-bg text-[11px] font-bold px-2 py-1 rounded-full">-{pct}%</span>
            )}
            {product.promoLabel && (
              <span className="border border-lime text-lime text-[11px] px-2 py-1 rounded-full">
                {product.promoLabel}
              </span>
            )}
          </div>
        )}
        <h3 className="text-2xl font-bold mb-1.5">{product.name}</h3>
        <p className="text-sub text-[13.5px] mb-4 max-w-[36ch]">{description}</p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-sub font-medium">{formatGHS(effectivePrice(product))}</span>
            {onSale && (
              <span className="text-xs text-sub/70 line-through">{formatGHS(product.basePrice)}</span>
            )}
          </div>
          <Link
            href={`/product/${product.slug}`}
            className="px-[22px] py-2.5 rounded-full bg-text text-bg font-bold text-[13px] shrink-0"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function TrendyPicks({ panels }: { panels: { product: Product; description: string }[] }) {
  if (panels.length === 0) return null;

  return (
    <div id="trendy" className="relative z-10">
      <FadeIn>
        <h2 className="text-center text-[32px] font-extrabold my-10">Our Trendy Picks</h2>
      </FadeIn>
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10">
        {panels.length === 1 ? (
          <FadeIn className="mx-auto w-full md:max-w-[560px]" y={28}>
            <Panel product={panels[0].product} description={panels[0].description} />
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {panels.map(({ product, description }, i) => (
              <FadeIn key={product.id} delay={i * 0.1} y={28}>
                <Panel product={product} description={description} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
