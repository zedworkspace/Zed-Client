import { create } from "zustand";

type CreateRole = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useCreateNewRole = create<CreateRole>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));