import { create } from "zustand";

interface FlightRequest {
  id: string;
  image: string;
  fromRect: DOMRect;
}

interface FlyToCartState {
  cartIconRect: DOMRect | null;
  flights: FlightRequest[];
  cartBump: number;
  setCartIconRect: (rect: DOMRect) => void;
  launch: (image: string, fromRect: DOMRect) => void;
  finish: (id: string) => void;
}

export const useFlyToCartStore = create<FlyToCartState>((set, get) => ({
  cartIconRect: null,
  flights: [],
  cartBump: 0,
  setCartIconRect: (rect) => set({ cartIconRect: rect }),
  launch: (image, fromRect) => {
    const id = `${Date.now()}-${Math.random()}`;
    set({ flights: [...get().flights, { id, image, fromRect }] });
  },
  finish: (id) =>
    set({
      flights: get().flights.filter((f) => f.id !== id),
      cartBump: get().cartBump + 1,
    }),
}));
