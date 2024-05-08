import { ICustomer } from "@/interfaces/Customers";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Store {
  customerName: string;
  setCustometName: () => void;
  customerToUpdate: ICustomer | null;
  setCustomerToUpdate: (customer: ICustomer | null) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      customerName: "Eduardo Burko",
      setCustometName: () =>
        set((state) => ({ customerName: state.customerName })),
      customerToUpdate: null,
      setCustomerToUpdate: (customer) =>
        set(() => ({ customerToUpdate: customer })),
    }),
    {
      name: "customer-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

// export const useStore = create<Store>()((set) => ({
//   customerName: "Eduardo Burko",
//   setCustometName: () => set((state) => ({ customerName: state.customerName })),
//   customerToUpdate: null,
//   setCustomerToUpdate: (customer) =>
//     set(() => ({ customerToUpdate: customer })),
// }));
