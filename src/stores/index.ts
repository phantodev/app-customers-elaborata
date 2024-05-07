import { ICustomer } from "@/interfaces/Customers";
import { create } from "zustand";

interface Store {
  customerName: string;
  setCustometName: () => void;
  customerToUpdate: ICustomer | null;
  setCustomerToUpdate: (customer: ICustomer) => void;
}

export const useStore = create<Store>()((set) => ({
  customerName: "Eduardo Burko",
  setCustometName: () => set((state) => ({ customerName: state.customerName })),
  customerToUpdate: null,
  setCustomerToUpdate: (customer) =>
    set(() => ({ customerToUpdate: customer })),
}));
