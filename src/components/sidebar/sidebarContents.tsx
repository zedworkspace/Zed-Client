import React from "react";
import { Kanban, MessagesSquare, Volume2 } from "lucide-react";
import { IGetChannels } from "@/interface/channelInterface";
import SidebarAccordion from "./sidebarAccordion";

type Props = {
  channelData?: IGetChannels;
};

export default function SidebarContents({ channelData }: Props) {
  return (
    <div className="h-3/4 bg-primary pt-4 space-y-2">
      <SidebarAccordion
        Icon={MessagesSquare}
        accordianValue="item-1"
        title="TEXT CHANNELS"
        channelData={channelData?.data.textChannels}
      />
      <SidebarAccordion
        Icon={Volume2}
        accordianValue="item-2"
        title="VOICE CHANNELS"
        channelData={channelData?.data.voiceChannels}
      />
      <SidebarAccordion
        Icon={Kanban}
        accordianValue="item-3"
        title="YOUR BOARDS"
        channelData={[]}
      />
    </div>
  );
}
