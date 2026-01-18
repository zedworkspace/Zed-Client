import { create } from "zustand";

interface ModalStore {
  isChangeOwnerOpen: boolean;
  openChangeOwner: () => void;
  closeChangeOwner: () => void;
}

export const usechangeOwnerStore = create<ModalStore>((set) => ({
  isChangeOwnerOpen: false,
  openChangeOwner: () => set({ isChangeOwnerOpen: true }),
  closeChangeOwner: () => set({ isChangeOwnerOpen: false }),
}));
