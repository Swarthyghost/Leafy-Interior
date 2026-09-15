import Image from "next/image";
import Link from "next/link";

export default function SpotlightBanner({ image }: { image?: string }) {
  return (
    <section className="max-w-[1200px] mx-auto w-full px-6 md:px-10 pb-20">
      <div className="glass grid grid-cols-1 md:grid-cols-2 overflow-hidden p-0">
        <div className="min-h-[240px] md:min-h-[360px] relative bg-[#233318]">
          {image && <Image src={image} alt="" fill className="object-cover" />}
        </div>
        <div className="p-8 md:p-[50px] flex flex-col justify-center">
          <h3 className="text-2xl font-extrabold mb-4 max-w-[14ch]">
            Finish Every Room With Pots &amp; Figurines
          </h3>
          <p className="text-sub text-sm mb-6 max-w-[36ch]">
            Twelve pot colours, three sizes, and a growing figurine collection for home and office
            shelves.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/shop?type=pot" className="bg-text text-bg px-[26px] py-3.5 rounded-full font-bold text-sm">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
