"use client";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";
import { useLeaveProject } from "@/hooks/useProject";
import { useEffect, useState } from "react";
import { usechangeOwnerStore } from "@/store/useModalStore";

type LeaveProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
};

export const LeaveProjectModal = ({ isOpen, onClose, projectId }: LeaveProjectModalProps) => {
    const router = useRouter();
    const {mutate, data, isPending, isSuccess} = useLeaveProject(projectId);
      const { openChangeOwner} = usechangeOwnerStore();
    const handleLeave = ()=>{
        mutate(projectId);
    }
    const [isOwnerModal, setIsOwnerModal] = useState(false);

    useEffect(()=>{
        if(isSuccess){
            if(data.isOwner){
                setIsOwnerModal(true);
            }else{
                onClose();
                router.push("/");
            }
        }
    },[isSuccess])
    
    const handleClose = () =>{
        setIsOwnerModal(false);
        onClose();
    }

    const handleChangeOwner = () =>{
        setIsOwnerModal(false);
        onClose();
        openChangeOwner();
    }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {
        isOwnerModal?(
            <DialogContent className="max-w-md border-none text-muted-foreground">
                <p className="text-gray-400">{data?.message}</p>
                <DialogFooter>
                <Button variant="ghost" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={handleChangeOwner} >
                    Change Ownership
                </Button>
                </DialogFooter>
            </DialogContent>
        ):(
            <DialogContent className="max-w-md border-none text-muted-foreground">
                <DialogTitle>Leave Project</DialogTitle>
                <p className="text-gray-400">Are you sure you want to leave this project?</p>
                <DialogFooter>
                <Button variant="ghost" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={handleLeave} disabled={isPending}>
                    {isPending ? "Leaving..." : "Leave Project"}
                </Button>
                </DialogFooter>
            </DialogContent>

        )
    }
        </Dialog>
  );
};
