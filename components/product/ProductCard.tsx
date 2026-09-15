import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatGHS } from "@/lib/format";
import QuickAddButton from "./QuickAddButton";

export default function ProductCard({ product, subtitle }: { product: Product; subtitle?: string }) {
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
          {!product.inStock && (
            <span className="absolute top-2 left-2 bg-bg/80 text-[11px] px-2 py-1 rounded-full text-sub">
              Sold out
            </span>
          )}
        </div>
        <h3 className="text-base font-bold mb-1">{product.name}</h3>
        <p className="text-[12.5px] text-sub mb-3.5">{subtitle}</p>
      </Link>
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-[15px]">{formatGHS(product.basePrice)}</span>
        <QuickAddButton product={product} />
      </div>
    </div>
  );
}
