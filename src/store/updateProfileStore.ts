import { UpdateProfile } from "@/types/profileTypes";
import { create } from "zustand";

export const useUpdateProfile = create<UpdateProfile>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
