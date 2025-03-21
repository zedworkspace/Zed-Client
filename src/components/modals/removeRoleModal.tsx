"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { useParams } from "next/navigation";

import { useRemoveRoleStore } from "@/store/roleStore";
import { useRemoveFromRole } from "@/hooks/useRole";
import { DialogDescription } from "@radix-ui/react-dialog";

export function RemoveRole() {
  const { projectId } = useParams() as {
    projectId: string;
  };
  const { roleId } = useParams() as {
    roleId: string;
  };

  const { isDeleteOpen, onDeleteClose, roleName, memberId, memberName} = useRemoveRoleStore();
  
  const { mutate } = useRemoveFromRole(roleId);


  const handleConfirmRemove = () => {
    mutate({projectId,roleId,userId:memberId})
  }

  return (
    <Dialog open={isDeleteOpen} onOpenChange={onDeleteClose}>
      <DialogContent className="sm:max-w-md border-none text-muted-foreground">
        <DialogHeader className="">
          <DialogTitle className="text-white">Remove Member</DialogTitle>
        </DialogHeader>
        <DialogDescription>

        </DialogDescription>

        <div className=" ">
          <p>Remove <span className=" text-foreground">{memberName}</span> from role <span className=" text-foreground">{roleName}</span>?</p>

        </div>
        <DialogFooter>
          <Button className="bg-none" type="submit" onClick={onDeleteClose}>
            Cancel
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" type="submit" onClick={handleConfirmRemove}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
