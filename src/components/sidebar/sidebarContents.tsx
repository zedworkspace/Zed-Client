"use client"
import React from "react";
import { Github, Kanban, MessagesSquare, Volume2 } from "lucide-react";
import { IGetChannels } from "@/interface/channelInterface";
import SidebarAccordion from "./sidebarAccordion";
import { IGetBoards } from "@/interface/boardInterface";
import {  usePathname, useRouter, useSearchParams } from "next/navigation";
import { Separator } from "../ui/separator";

type Props = {
  channelData?: IGetChannels;
  boardData?: IGetBoards;
};

export default function SidebarContents({ channelData, boardData }: Props) {
  const router = useRouter();
  const pathName = usePathname()
  const path = pathName.split('/')[3]
 
  return (
    <div className="h-3/4 bg-primary pt-4 space-y-2 ">
      {/* github */}
      <div className="px-2" onClick={() => router.replace("git-hub")}>
        <div
          className={`w-full gap-2 cursor-pointer flex items-center p-2 text-muted-foreground hover:bg-secondary/50 hover:text-white transition-colors duration-200 rounded-md h-10 font-bold ${
            path === "git-hub" ? "bg-secondary/80" : ""
          } }`}
        >
          <Github className="size-5" />
          <span className="text-sm font-bold">Git Hub</span>
        </div>
      </div>
      <Separator className="w-[95%] m-auto bg-white/30 h-0.5"/>
      <div className="flex flex-col gap-3 py-3">
        {/* Text channels  */}
      <SidebarAccordion
        Icon={MessagesSquare}
        accordianValue="item-1"
        title="TEXT CHANNELS"
        channelData={channelData?.data.textChannels}
        type="text"
      />
      {/* Voice channels */}
      <SidebarAccordion
        Icon={Volume2}
        accordianValue="item-2"
        title="VOICE CHANNELS"
        channelData={channelData?.data.voiceChannels}
        type="voice"
      />
      {/* board */}
      <SidebarAccordion
        Icon={Kanban}
        accordianValue="item-3"
        title="YOUR BOARDS"
        channelData={boardData?.data}
        type="board"
      />
      </div>
      
    </div>
  );
}
