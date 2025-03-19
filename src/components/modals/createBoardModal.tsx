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
import { useCreateBoardStore } from "@/store/boardStore";
import { Input } from "../ui/input";
import { useCreateBoard } from "@/hooks/useBoard";
import { useParams } from "next/navigation";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export function CreateBoard() {

    const {projectId} = useParams()as {
        projectId:string
    }

    const { isCreateBoardOpen, onCreateBoardClose } = useCreateBoardStore()
    const [name,setName] = useState('')
    const {mutate, isPending} = useCreateBoard(projectId)

    const handleCreate = () => {
        mutate({name,projectId})
        onCreateBoardClose()
    }

  return (
    <Dialog open={isCreateBoardOpen} onOpenChange={onCreateBoardClose}>
      <DialogContent className="sm:max-w-md border-none text-muted-foreground">
        <DialogHeader className="">
          <DialogTitle className="text-white">Create Board</DialogTitle>
          <DialogDescription>
            Provide a unique name for your board to organize your tasks efficiently.
          </DialogDescription>
        </DialogHeader>
        <div>
            <Input placeholder="Give a name for your board" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <DialogFooter>
            <Button className="bg-none" type="submit" onClick={handleCreate}>{isPending?<LoaderCircle/>:'Create'}</Button>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
