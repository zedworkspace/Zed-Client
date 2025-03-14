// import { create } from "zustand";

// type NewInvite = {
//     isOpen : boolean
//     onOpen : ()=>void
//     onClose : () => void
// }

// export const useNewInviteStore = create <NewInvite>((set)=>({
//     isOpen :false,
//     onOpen: () => {
//         console.log("onOpen called");
//         set({ isOpen: true });
//     },
//     onClose: () => {
//         console.log("onClose called");
//         set({ isOpen: false });
//     }
// }))

import { create } from "zustand";

type InviteStore = {
    // Generate
    isGenerateModalOpen: boolean;
    openGenerateModal: () => void;
    closeGenerateModal: () => void;

    // Accept/Reject
    isAcceptModalOpen: boolean;
    inviteId: string | null;
    setInvite: (inviteId: string | null) => void;
    openAcceptModal: () => void;
    closeAcceptModal: () => void;
};

export const useInviteStore = create<InviteStore>((set) => ({
    // Generate
    isGenerateModalOpen: false,
    openGenerateModal: () => set({ isGenerateModalOpen: true }),
    closeGenerateModal: () => set({ isGenerateModalOpen: false }),

    // Accept/Reject
    isAcceptModalOpen: false,
    inviteId: null,
    setInvite: (inviteId) => {
        set({ inviteId })
        console.log(inviteId);
    },
    openAcceptModal: () => set({ isAcceptModalOpen: true }),
    closeAcceptModal: () => set({ isAcceptModalOpen: false, inviteId: null }),
}));
