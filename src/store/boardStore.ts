import { create } from "zustand";

type CreateBoard = {
    isCreateBoardOpen: boolean;
    onCreateBoardOpen: () => void;
    onCreateBoardClose: () => void;
} 

export const useCreateBoardStore = create<CreateBoard> ((set) => ({
    isCreateBoardOpen: false,
    onCreateBoardOpen: () => set({ isCreateBoardOpen:true }),
    onCreateBoardClose: () => set({ isCreateBoardOpen:false })
}))