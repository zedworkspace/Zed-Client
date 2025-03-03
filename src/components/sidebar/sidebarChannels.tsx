import React from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { IMapChannels } from "@/interface/channelInterface";
import { useParams, useRouter } from "next/navigation";
import { Github, Trello } from "lucide-react";

type Props = {
  channels: IMapChannels[];
};

export default function SidebarChannels({ channels }: Props) {
  const router = useRouter();
  const params = useParams();
  const channelId = params.channelId as string;

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <SidebarMenuItem
              key={channel._id}
              onClick={() => router.replace(channel.url)}
            >
              <SidebarMenuButton
                className={`w-full flex items-center p-2 text-muted-foreground hover:bg-secondary/50 hover:text-white transition-colors duration-200 rounded-md h-10 font-bold ${
                  channelId === channel._id ? "bg-secondary" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="size-5" />
                  <span className="text-sm font-bold">{channel.name}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
        <SidebarMenuItem onClick={() => {}}>
          <SidebarMenuButton
            className={`w-full flex items-center p-2 text-muted-foreground hover:bg-secondary/50 hover:text-white transition-colors duration-200 rounded-md h-10 font-bold`}
          >
            <div className="flex items-center space-x-3">
              <Trello className="size-5" />
              <span className="text-sm font-bold">Git Hub</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem onClick={() => {}}>
          <SidebarMenuButton
            className={`w-full flex items-center p-2 text-muted-foreground hover:bg-secondary/50 hover:text-white transition-colors duration-200 rounded-md h-10 font-bold`}
          >
            <div className="flex items-center space-x-3">
              <Github className="size-5" />
              <span className="text-sm font-bold">Git Hub</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
