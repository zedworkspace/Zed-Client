/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { useGetProjectMembers } from "@/hooks/useMembers";
import { useAssignRoleStore } from "@/store/roleStore";
import { useAssignRole } from "@/hooks/useRole";

export function AssigneRole() {
  const { projectId } = useParams() as {
    projectId: string;
  };
  const { roleId } = useParams() as {
    roleId: string;
  };

  const { isOpen, onClose, members } = useAssignRoleStore();
  const { data } = useGetProjectMembers({ projectId, enabled: isOpen });
  const { mutate } = useAssignRole(roleId);

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const filteredMembers = data?.data?.filter(
    (member) =>
      !members.some((assigned) => assigned.userId === member.userId._id)
  );

  const handleAdd = () => {
    mutate({ projectId, roleId, userId: selectedMembers });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-none text-muted-foreground">
        <DialogHeader className="">
          <DialogTitle className="text-white">Add Members</DialogTitle>
        </DialogHeader>

        <div className="mt-5 space-y-10">
          <Input
            placeholder="search members"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <div>
            <p className="font-bold text-sm text-white">Members</p>
            {filteredMembers?.map((member, ind) => (
              <div key={ind} className="flex items-center space-x-3 mt-5">
                <Checkbox
                  className="border-white "
                  checked={selectedMembers.includes(member.userId._id ?? "")}
                  onCheckedChange={() =>
                    toggleMemberSelection(member.userId._id ?? "")
                  }
                />
                <img
                  src={member.userId.profileImg}
                  alt={member.userId.name}
                  className="w-6 h-6 rounded-full"
                />
                <p>{member.userId.name}</p>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-none" type="submit" onClick={handleAdd}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
