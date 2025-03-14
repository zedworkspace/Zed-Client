"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  ChevronUp,
  FolderKanban,
  Kanban,
  Plus,
  UserRoundPlus,
} from "lucide-react";

import { useInviteStore } from "@/store/inviteStore";
import { InviteMembers } from "../modals/inviteMembersModal";
import { useCreateChannelStore } from "@/store/channelStore";
import { useCreateBoardStore } from "@/store/boardStore";

type Props = {
  projectData: any;
};

export default function SideBarHead({ projectData }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { openGenerateModal } = useInviteStore();
  const { onOpen } = useCreateChannelStore()
  const { onCreateBoardOpen } = useCreateBoardStore()
  const dropdownItems = [
    {
      icon: FolderKanban,
      label: "Project Profile",
      onClick: () => {},
    },
    { icon: UserRoundPlus, label: "Invite People", onClick: () => {}},
    { icon: Kanban, label: "Create board", onClick: () => {onCreateBoardOpen()} },
    { icon: Plus, label: "Create channel", onClick: () => {onOpen()} },
  ];

  return (
    <div
      className="h-1/4 w-full p-0 bg-cover bg-center bg-transparent"
      style={{ backgroundImage: `url(${projectData?.data.logo})` }}
    >
      <InviteMembers/>
      <div className="flex justify-between items-center bg-black bg-opacity-20 p-3 w-full text-white text-base font-semibold">
        <h1>{projectData?.data.name}</h1>
        <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="border-none outline-none">
            {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-background text-white border-none outline-none p-2">
            <DropdownMenuGroup>
              {dropdownItems.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex items-center cursor-pointer space-x-2 p-2 focus:bg-secondary focus:text-white transition-colors duration-200"
                  onClick={item.onClick}
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
                <DropdownMenuItem
                  className="flex items-center cursor-pointer space-x-2 p-2 focus:bg-secondary focus:text-white transition-colors duration-200"
                  onClick={openGenerateModal}
                >
                  <UserRoundPlus className="size-4" />
                  <span>Invite People</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
