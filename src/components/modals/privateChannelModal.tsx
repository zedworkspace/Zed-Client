"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useCreateChannelStore,
  usePrivateChannelStore,
} from "@/store/channelStore";
import { Button } from "../ui/button";
import {
  LoaderCircle,
  MessageSquare,
  Volume2,
} from "lucide-react";

import { useCreateChannel } from "@/hooks/useChannel";
import { useParams } from "next/navigation";
import { FaLock } from "react-icons/fa";
import { Input } from "../ui/input";

export function PrivatChannel() {
  const {  onOpen, setName, setType, type, name, setIsPrivate } = useCreateChannelStore();
  const { isOpenPrivate, onClosePriate,  } =
    usePrivateChannelStore();

  const { projectId } = useParams() as {
    projectId: string;
  };

  const {  isPending } = useCreateChannel(projectId);
  // const {data} = useGetProjectMembers(projectId)

  const handleCreate = () => {
    // mutate({ name, type, projectId });
  };

  const handleBack = () => {
    onClosePriate()
    onOpen()
  }
   const handleClose = () => {
    setName('')
    setType('text')
    setIsPrivate(false)
    onClosePriate()
   }

  return (
    <Dialog open={isOpenPrivate} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-none text-muted-foreground">
        <DialogHeader className="">
          <DialogTitle className="text-white">Add members or roles</DialogTitle>
          <div className="space-y-4">
            <div className="flex items-center space-x-1">
              <div className="relative">
                {type === "text" ? (
                  <MessageSquare size={20} />
                ) : (
                  <Volume2 size={20} />
                )}
                <FaLock size={8} className="absolute top-0 right-0" />
              </div>
              <p className="text-sm">{name}</p>
            </div>
            <div>
              <Input placeholder="" />
            </div>
            <div>
              <p className="text-sm">ROLES</p>
            </div>
            <div>
              <p className="text-sm">MEMBERS</p>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
            <Button className="bg-none" onClick={handleBack}>Back</Button>
          <Button
            onClick={handleCreate}
            type="submit"
            className=""
            disabled={isPending}
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
