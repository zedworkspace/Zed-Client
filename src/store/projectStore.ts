import { create } from "zustand";

type NewProject = {
    isOpen : boolean
    onOpen : ()=>void
    onClose : () => void
}

export const useNewProjectStore = create <NewProject>((set)=>({
    isOpen :false,
    onOpen:()=>set({isOpen:true}),
    onClose : ()=>set({isOpen:false})
}))