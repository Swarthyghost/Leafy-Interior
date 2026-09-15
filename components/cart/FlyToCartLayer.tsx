"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFlyToCartStore } from "@/store/flyToCart";

export default function FlyToCartLayer() {
  const flights = useFlyToCartStore((s) => s.flights);
  const cartIconRect = useFlyToCartStore((s) => s.cartIconRect);
  const finish = useFlyToCartStore((s) => s.finish);

  if (flights.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <AnimatePresence>
        {flights.map((flight) => {
          const startSize = 64;
          const startX = flight.fromRect.left + flight.fromRect.width / 2 - startSize / 2;
          const startY = flight.fromRect.top + flight.fromRect.height / 2 - startSize / 2;

          const endX = cartIconRect
            ? cartIconRect.left + cartIconRect.width / 2 - 8
            : startX;
          const endY = cartIconRect ? cartIconRect.top + cartIconRect.height / 2 - 8 : startY;

          return (
            <motion.div
              key={flight.id}
              className="absolute rounded-xl overflow-hidden bg-[#233318] shadow-lg"
              style={{ width: startSize, height: startSize, backgroundImage: `url(${flight.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
              initial={{ x: startX, y: startY, scale: 1, opacity: 1 }}
              animate={{
                x: endX,
                y: endY,
                scale: 0.15,
                opacity: 0.6,
              }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              onAnimationComplete={() => finish(flight.id)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
