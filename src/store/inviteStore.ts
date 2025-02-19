import { create } from "zustand";

type NewInvite = {
    isOpen : boolean
    onOpen : ()=>void
    onClose : () => void
}

export const useNewInviteStore = create <NewInvite>((set)=>({
    isOpen :false,
    onOpen: () => {
        console.log("onOpen called");
        set({ isOpen: true });
    },
    onClose: () => {
        console.log("onClose called");
        set({ isOpen: false });
    }
}))