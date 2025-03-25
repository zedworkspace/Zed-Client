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
  LogOut,
  Plus,
  UserRoundPlus,
} from "lucide-react";
import { useInviteStore } from "@/store/inviteStore";
import { InviteMembers } from "../modals/inviteMembersModal";
import { useCreateChannelStore } from "@/store/channelStore";
import { useParams, useRouter } from "next/navigation";
import { LeaveProjectModal } from "../modals/LeaveProjectModal";
import { useGetMemberPermissions } from "@/hooks/useRole";
import { hasPermission } from "@/utils/checkPermission";
import ChangeOwnerModal from "../modals/ChangeOwnerModal";
import { IGetProject } from "@/interface/projectInterface";

type Props = {
  projectData?: IGetProject;
};

export default function SideBarHead({ projectData }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const router = useRouter();
  const { openGenerateModal } = useInviteStore();
  const { onOpen } = useCreateChannelStore();
  const { projectId } = useParams() as { projectId: string };
  const { data } = useGetMemberPermissions(projectId);

  const dropdownItems = [
    {
      icon: FolderKanban,
      label: "Project Profile",
      onClick: () => router.push(`/project/${projectId}/profile`),
      hasPermission: hasPermission(["ADMINISTRATION","MANAGE_ROLES"], data?.data),
    },
    {
      icon: UserRoundPlus,
      label: "Invite People",
      onClick: openGenerateModal,
      hasPermission: hasPermission(
        ["ADMINISTRATION", "INVITE_MEMBERS"],
        data?.data
      ),
    },
    {
      icon: Plus,
      label: "Create channel",
      onClick: onOpen,
      hasPermission: hasPermission(
        ["ADMINISTRATION", "MANAGE_CHANNELS"],
        data?.data
      ),
    },
    {
      icon: LogOut,
      label: "Leave project",
      onClick: () => setIsLeaveModalOpen(true),
      hasPermission: true,
    },
  ];

  return (
    <div
      className="h-1/4 w-full p-0 bg-cover bg-center bg-transparent"
      style={{ backgroundImage: `url(${projectData?.data.banner})` }}
    >
      <InviteMembers />
      <LeaveProjectModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        projectId={projectData?.data._id}
      />
      <ChangeOwnerModal/>
      <div className="flex justify-between items-center bg-black bg-opacity-20 p-3 w-full text-white text-base font-semibold">
        <h1>{projectData?.data.name}</h1>
        <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="border-none outline-none">
            {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-background text-white border-none outline-none p-2">
            <DropdownMenuGroup>
              {dropdownItems.map(
                (item, index) =>
                  item.hasPermission && (
                    <DropdownMenuItem
                      key={index}
                      className="flex items-center cursor-pointer space-x-2 p-2 focus:bg-secondary focus:text-white transition-colors duration-200"
                      onClick={item.onClick}
                    >
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  )
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
