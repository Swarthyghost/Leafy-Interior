import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatGHS } from "@/lib/format";
import { discountPercent, effectivePrice, isDiscounted } from "@/lib/pricing";
import QuickAddButton from "./QuickAddButton";

export default function ProductCard({ product, subtitle }: { product: Product; subtitle?: string }) {
  const pct = discountPercent(product);
  const onSale = isDiscounted(product);

  return (
    <div className="glass p-4">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-[#233318] relative">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 300px"
              className="object-cover"
            />
          ) : null}

          <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
            {pct !== null && (
              <span className="bg-lime text-bg text-[11px] font-bold px-2 py-1 rounded-full">
                -{pct}%
              </span>
            )}
            {product.promoLabel && (
              <span className="bg-bg/80 text-[11px] px-2 py-1 rounded-full text-lime">
                {product.promoLabel}
              </span>
            )}
          </div>

          {!product.inStock && (
            <span className="absolute top-2 right-2 bg-bg/80 text-[11px] px-2 py-1 rounded-full text-sub">
              Sold out
            </span>
          )}
        </div>
        <h3 className="text-base font-bold mb-1">{product.name}</h3>
        <p className="text-[12.5px] text-sub mb-3.5">{subtitle}</p>
      </Link>
      <div className="flex items-center justify-between">
        <span className="flex items-baseline gap-2">
          <span className="font-extrabold text-[15px]">{formatGHS(effectivePrice(product))}</span>
          {onSale && (
            <span className="text-xs text-sub line-through">{formatGHS(product.basePrice)}</span>
          )}
        </span>
        <QuickAddButton product={product} />
      </div>
    </div>
  );
}
