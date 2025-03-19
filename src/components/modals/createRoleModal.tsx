"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useCreateNewRole } from "@/store/roleStore";
import { useCreateRole } from "@/hooks/useRole";

export function CreateRole() {
  const { projectId } = useParams() as {
    projectId: string;
  };

  const router = useRouter()

  const { isOpen, onClose } = useCreateNewRole();
  const [name, setName] = useState("");
  const { mutate, isPending,data, isSuccess } = useCreateRole(projectId);


  const roleId = data?.data._id
  useEffect(()=>{
    if(isSuccess){
        router.push(`profile/${roleId}`)
    }
  },[isSuccess,roleId,router])
  const handleCreate = () => {
    mutate({name,projectId});
    setName('')
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-none text-muted-foreground">
        <DialogHeader className="">
          <DialogTitle className="text-white">Create Role</DialogTitle>
        </DialogHeader>
        <DialogDescription className="">
          Assign a name to the role. This will help categorize user permissions
          effectively.
        </DialogDescription>
        <div>
          <Input
            placeholder="Give a name for role"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button className="bg-none" type="submit" onClick={handleCreate} disabled = {name==""}>
            {isPending ? <LoaderCircle /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
