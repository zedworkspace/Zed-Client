import { create } from "zustand";

export type CreateChannel = {
  name:string;
  type:string;
  isPrivate:boolean;
  isOpen: boolean;
  setName: (name:string) => void;
  setType : (type:string) => void;
  setIsPrivate: (isPrivate:boolean) =>void;
  onOpen: () => void;
  onClose: () => void;
};

export type PrivateChannel = {
  channelType: string;
  channelName: string;
  isOpenPrivate: boolean;
  onClosePriate: () => void;
  onOpenPrivate: () => void;
  setChannelType: (type: string) => void;
  setChannelName: (name: string) => void;
};

export const useCreateChannelStore = create<CreateChannel>((set) => ({
  type:"text",
  name:"",
  isPrivate:false,
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  setName: (name) =>set({name:name}),
  setType: (type) => set({type:type}),
  setIsPrivate: (isPrivate) => set({isPrivate:isPrivate})
}));

export const usePrivateChannelStore = create<PrivateChannel>((set) => ({
  channelType: "",
  channelName: "",
  isOpenPrivate: false,
  onClosePriate: () => set({ isOpenPrivate: false }),
  onOpenPrivate: () => set({ isOpenPrivate: true }),
  setChannelType: (type) => set({ channelType: type }),
  setChannelName: (name) => set({ channelName: name }),
}));
