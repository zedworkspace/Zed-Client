/* eslint-disable react-hooks/exhaustive-deps */
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
  Kanban,
  LoaderCircle,
  LockKeyhole,
  MessagesSquare,
  Volume2,
} from "lucide-react";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useCreateChannel } from "@/hooks/useChannel";
import { useParams, useRouter } from "next/navigation";
import { Switch } from "../ui/switch";
import { useEffect } from "react";
import { useCreateBoard } from "@/hooks/useBoard";

export function CreateChannel() {
  const {
    onClose,
    isOpen,
    setName,
    name,
    type,
    setType,
    isPrivate,
    setIsPrivate,
  } = useCreateChannelStore();
  const { onOpenPrivate } = usePrivateChannelStore();

  const { projectId } = useParams() as {
    projectId: string;
  };

  const { mutate, isPending, isSuccess, data } = useCreateChannel(projectId);
  const {
    mutate: boardMutate,
    isSuccess: boardSuccess,
    data: boardData,
  } = useCreateBoard(projectId);
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.setItem("channelType", type);
      const id = data.data._id;
      router.push(`/project/${projectId}/${id}`);
      onClose();
    } else if (boardSuccess) {
      sessionStorage.setItem("channelType", type);
      const id = boardData.data._id;
      router.push(`/project/${projectId}/${id}`);
      onClose();
    }
  }, [isSuccess, boardSuccess]);

  const handleCreate = () => {
    if (type === "board") {
      boardMutate({ name, projectId });
    } else {
      mutate({ name, type, projectId });
    }
  };

  const handleNext = () => {
    onClose();
    onOpenPrivate();
  };

  const handleCloseModal = () => {
    setIsPrivate(false);
    setType("text");
    setName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-md border-none text-muted-foreground">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-white">Create Channel</DialogTitle>
          <div className="space-y-7">
            <div className="space-y-2 mt-4">
              <p className="text-sm text-gray-400">CHANNEL TYPE</p>
              <RadioGroup
                value={type}
                onValueChange={setType}
                className="space-y-1"
              >
                {/* Text Channel */}
                <label
                  className={`flex items-center justify-between  h-16 rounded-md px-4 cursor-pointer hover:bg-gray-700 transition ${
                    type === "text" ? " bg-indigo-500" : "bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <MessagesSquare className="text-gray-300" size={20} />
                    <div>
                      <h1 className="text-white text-sm font-medium">Text</h1>
                      <p className="text-xs text-gray-400">
                        Send messages, images, and emojis
                      </p>
                    </div>
                  </div>
                  <RadioGroupItem value="text" />
                </label>

                {/* Voice Channel */}
                <label
                  className={`flex items-center justify-between  h-16 rounded-md px-4 cursor-pointer hover:bg-gray-700 transition ${
                    type === "voice" ? " bg-indigo-500" : "bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Volume2 className="text-gray-300" size={20} />
                    <div>
                      <h1 className="text-white text-sm font-medium">Voice</h1>
                      <p className="text-xs text-gray-400">
                        Hang out together with voice, audio, and screen share
                      </p>
                    </div>
                  </div>
                  <RadioGroupItem value="voice" />
                </label>

                <label
                  className={`flex items-center justify-between  h-16 rounded-md px-4 cursor-pointer hover:bg-gray-700 transition ${
                    type === "board" ? " bg-indigo-500" : "bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Kanban className="text-gray-300" size={20} />
                    <div>
                      <h1 className="text-white text-sm font-medium">Board</h1>
                      <p className="text-xs text-gray-400">
                        create board to organize your tasks efficiently.
                      </p>
                    </div>
                  </div>
                  <RadioGroupItem value="board" />
                </label>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-400">CHANNEL NAME</p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {type === "voice" ? (
                    <Volume2 size={18} />
                  ) : type === "text" ? (
                    <MessagesSquare size={18} />
                  ) : (
                    <Kanban size={18} />
                  )}
                </span>

                <Input
                  placeholder="new-channel"
                  className="pl-10 focus:ring-2"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <LockKeyhole size={18} />
                  <p className="text-sm text-gray-400">Private Channel</p>
                </div>
                <Switch
                  id="private-channel"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                  className="data-[state=checked]:bg-indigo-500"
                />
              </div>
              <p className="text-xs text-gray-400">
                Only selected members and roles will able to view this channel
              </p>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          {isPrivate ? (
            <Button
              onClick={handleNext}
              className="font-semibold w-28"
              size="lg"
              disabled={isPending || name == ""}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              type="submit"
              className="font-semibold w-28"
              size="lg"
              disabled={isPending || name == ""}
            >
              {isPending ? <LoaderCircle className="animate-spin" /> : "Create"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
