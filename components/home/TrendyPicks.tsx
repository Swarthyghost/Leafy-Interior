import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatGHS } from "@/lib/format";

function Panel({ product, description }: { product: Product; description: string }) {
  return (
    <div className="glass flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8">
      <div>
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-sub text-[13.5px] max-w-[30ch] mb-4">{description}</p>
        <div className="text-xl font-extrabold mb-3.5">{formatGHS(product.basePrice)}</div>
        <div className="flex gap-2.5">
          <Link
            href={`/product/${product.slug}`}
            className="px-[22px] py-2.5 rounded-full bg-text text-bg font-bold text-[13px]"
          >
            Buy Now
          </Link>
        </div>
      </div>
      <div className="w-full md:w-[150px] h-[200px] md:h-[150px] rounded-2xl overflow-hidden shrink-0 relative bg-[#233318]">
        {product.images[0] && (
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        )}
      </div>
    </div>
  );
}

export default function TrendyPicks({ panels }: { panels: { product: Product; description: string }[] }) {
  if (panels.length === 0) return null;

  return (
    <div id="trendy" className="relative z-10">
      <h2 className="text-center text-[32px] font-extrabold my-10">Our Trendy Picks</h2>
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10 flex flex-col gap-5">
        {panels.map(({ product, description }) => (
          <Panel key={product.id} product={product} description={description} />
        ))}
      </div>
    </div>
  );
}
