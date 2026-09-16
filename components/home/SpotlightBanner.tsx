"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SpotlightBanner() {
  return (
    <section className="max-w-[1200px] mx-auto w-full px-6 md:px-10 pb-20">
      <div className="glass relative overflow-hidden min-h-[420px] md:min-h-[480px] flex items-center p-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/image.jpg"
              alt="Potted plants styled against a living room wall"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(10,18,8,0.92) 0%, rgba(10,18,8,0.8) 40%, rgba(10,18,8,0.35) 68%, transparent 92%)",
          }}
        />

        <motion.div
          className="relative z-10 p-8 md:p-[60px] max-w-[460px]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h3
            className="text-2xl md:text-[28px] font-extrabold mb-4 max-w-[14ch]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Finish Every Room With Pots &amp; Figurines
          </motion.h3>
          <motion.p
            className="text-sub text-sm mb-6 max-w-[36ch]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Twelve pot colours, three sizes, and a growing figurine collection for home and office
            shelves.
          </motion.p>
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/shop?type=pots"
              className="bg-text text-bg px-[26px] py-3.5 rounded-full font-bold text-sm"
            >
              Explore
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
