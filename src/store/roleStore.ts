import { Member } from "@/interface/roleInterFace";
import { create } from "zustand";

type CreateRole = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

type AssignRole = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  members: Member[];
  setMembers: (members: Member[]) => void;
};

type RemoveRole = {
  isDeleteOpen: boolean;
  onDeleteOpen: () => void;
  onDeleteClose: () => void;
  memberName: string;
  roleName: string;
  setMemberName: (memberName: string) => void;
  setRoleName: (roleName: string) => void;
};

export const useCreateNewRole = create<CreateRole>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useAssignRoleStore = create<AssignRole>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  members: [],
  setMembers: (members) => set({ members: members }),
}));

export const useRemoveRoleStore = create<RemoveRole>((set) => ({
  isDeleteOpen: false,
  onDeleteOpen: () => set({ isDeleteOpen: true }),
  onDeleteClose: () => set({ isDeleteOpen: false }),
  memberName: "",
  roleName: "",
  setMemberName: (memberName) => set({ memberName: memberName }),
  setRoleName: (roleName) => set({ roleName: roleName }),
}));
