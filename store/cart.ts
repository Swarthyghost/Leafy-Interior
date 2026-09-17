import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLineItem, PotSelection } from "@/types";

interface CartState {
  items: CartLineItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartLineItem, "lineId">) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  setPot: (lineId: string, pot: PotSelection | undefined) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

function makeLineId(item: Omit<CartLineItem, "lineId">): string {
  return [item.productId, item.variant?.id ?? "novariant", item.pot?.productId ?? "nopot"].join("::");
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const lineId = makeLineId(item);
        const existing = get().items.find((i) => i.lineId === lineId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.lineId === lineId ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, lineId }] });
        }
        set({ isOpen: true });
      },
      removeItem: (lineId) => set({ items: get().items.filter((i) => i.lineId !== lineId) }),
      updateQuantity: (lineId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(lineId);
          return;
        }
        set({ items: get().items.map((i) => (i.lineId === lineId ? { ...i, quantity } : i)) });
      },
      setPot: (lineId, pot) =>
        set({ items: get().items.map((i) => (i.lineId === lineId ? { ...i, pot } : i)) }),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: "leafy-interior-cart", partialize: (state) => ({ items: state.items }) }
  )
);

export function useCartCount() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
}
