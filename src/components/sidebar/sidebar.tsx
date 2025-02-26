"use client";
import React, { useEffect, useState } from "react";
import { AudioWaveform, MessageCircle } from "lucide-react";
import { Sidebar, SidebarContent, SidebarProvider } from "../ui/sidebar";
import { useGetProject } from "@/hooks/useProject";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { IGetChannels, IMapChannels } from "@/interface/channelInterface";
import SidebarLoading from "./sidebarLoading";
import SideBarHead from "./sidebarHeader";
import SidebarChannels from "./sidebarChannels";

export default function SideBar() {
  const queryClient = useQueryClient();
  const { projectId } = useParams() as { projectId: string };
  const { data, isSuccess, isLoading, isError } = useGetProject(projectId);

  const cachedChannels = queryClient.getQueryData<IGetChannels>([
    "channels",
    projectId,
  ]);

  const channels =
    cachedChannels?.data.map((channel) => ({
      ...channel,
      url: `/project/${channel.projectId}/${
        channel.type === "text" ? "text-channel" : "voice-channel"
      }/${channel._id}`,
      icon: channel.type === "text" ? MessageCircle : AudioWaveform,
    })) || [];

  if (isLoading) return <SidebarLoading />;

  if (isError) return <div>Something happened</div>;

  if (isSuccess)
    return (
      <SidebarProvider>
        <Sidebar className="absolute col-span-1 top-0 left-0 z-0 border-none bg-primary">
          <SideBarHead projectData={data} />
          <SidebarContent className="bg-primary">
            <SidebarChannels channels={channels} />
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );
}
