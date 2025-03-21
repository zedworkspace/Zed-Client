// components/project/DeleteRoleModal.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useDeleteRole } from "@/hooks/useRole";

type Modal = {
    isOpen:boolean;
    setIsOpen:(id:boolean)=>void;
    selectedRole:{
        roleId:string,
        roleName:string
    } | null;
    projectId:string
}

const DeleteRoleModal = ({ isOpen, setIsOpen, selectedRole, projectId }:Modal) => {
  const { mutate } = useDeleteRole(projectId);

  const handleDeleteConfirm = () => {
    if (selectedRole ) {
      mutate({ roleId: selectedRole.roleId, projectId });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the role{" "}
            <span className="font-semibold">{selectedRole?.roleName}</span> and
            remove all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRoleModal;