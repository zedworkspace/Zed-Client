import { Profile, UpdateProfile } from "@/types/profileTypes";
import { create } from "zustand";

export const useProfileStore = create<Profile>((set) => ({
  isOpen: false,
  profileId: "",
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  setProfileId: (id) => set({profileId:id})
}));


export const useUpdateProfileStore = create<UpdateProfile>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
