import { create } from "zustand";
import type { CustomerInfo } from "@/types";

interface CheckoutState {
  customer: CustomerInfo | null;
  setCustomer: (customer: CustomerInfo) => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  customer: null,
  setCustomer: (customer) => set({ customer }),
}));
