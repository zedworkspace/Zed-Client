"use client";
import React, { useState } from "react";
import { SidebarHeader } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AudioWaveform,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Trello,
  User,
} from "lucide-react";
import { IGetProject } from "@/interface/projectInterface";

type Props = {
  projectData: IGetProject;
};

const dropdownItems = [
  { icon: User, label: "Profile" },
  { icon: Trello, label: "Create board" },
  { icon: MessageCircle, label: "Create text channel" },
  { icon: AudioWaveform, label: "Create voice channel" },
];

export default function SideBarHead({ projectData }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <SidebarHeader
      className="h-1/4 w-full p-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${projectData?.data.logo})` }}
    >
      <div className="flex justify-between items-center bg-black bg-opacity-20 p-4 w-full text-white text-xl font-semibold">
        <h1>{projectData?.data.name}</h1>
        <DropdownMenu onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="border-none outline-none">
            {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-background text-white border-none outline-none p-0">
            <DropdownMenuGroup>
              {dropdownItems.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex items-center space-x-2 p-2 focus:bg-secondary focus:text-white transition-colors duration-200"
                >
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarHeader>
  );
}
