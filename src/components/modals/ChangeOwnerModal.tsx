"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useChangeOwner } from "@/hooks/useProject"; // Change owner mutation
import { useGetProjectMembers } from "@/hooks/useMembers";
import { usechangeOwnerStore } from "@/store/useModalStore"; // Zustand Store

interface ChangeOwnerModalProps {
  projectId: string;
}

export default function ChangeOwnerModal({ projectId }: ChangeOwnerModalProps) {
  const { isChangeOwnerOpen, closeChangeOwner } = usechangeOwnerStore();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const { data: members, isLoading } = useGetProjectMembers({ projectId, enabled: isChangeOwnerOpen });
  const { mutate: changeOwner, isPending } = useChangeOwner();

  const filteredMembers = members?.data?.filter((member) =>
    member.userId.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangeOwner = () => {
    if (!selectedUser) return;
    console.log(selectedUser);
    // changeOwner({ projectId, userId: selectedUser }, { onSuccess: closeChangeOwner });
  };

  useEffect(() => {
    if (!isChangeOwnerOpen) {
      setSearch("");
      setSelectedUser(null);
    }
  }, [isChangeOwnerOpen]);

  return (
    <Dialog open={isChangeOwnerOpen} onOpenChange={closeChangeOwner}>
      <DialogContent className="max-w-md border-none text-muted-foreground">
        <DialogHeader>
          <DialogTitle>Change Project Owner</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />
        <ScrollArea className="h-40 border rounded-md p-2">
          {isLoading ? (
            <p>Loading members...</p>
          ) : filteredMembers?.length ? (
            filteredMembers.map((member) => (
              <div
                key={member._id}
                className={`cursor-pointer p-2 rounded-md ${
                  selectedUser === member._id ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedUser(member._id)}
              >
                {member.userId.name}
              </div>
            ))
          ) : (
            <p>No members found</p>
          )}
        </ScrollArea>
        <Button
          onClick={handleChangeOwner}
          disabled={!selectedUser || isPending}
          className="w-full mt-4"
        >
          {isPending ? "Changing..." : "Change Owner"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
