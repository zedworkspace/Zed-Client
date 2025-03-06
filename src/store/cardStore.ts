import { create } from "zustand";

type CardStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  cardId: string;
  setCardid: (id: string) => void;
};

export const useCardStore = create<CardStore>((set) => ({
  isOpen: false,
  onOpen: function () {
    set({ isOpen: true });
  },
  onClose: function () {
    set({ isOpen: false });
  },
  cardId: "",
  setCardid: (id) => {
    set({ cardId: id });
  },
}));
