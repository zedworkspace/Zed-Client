"use client";
import React, { useEffect, useState } from "react";
import { AudioWaveform, MessageCircle } from "lucide-react";
import { Sidebar, SidebarContent, SidebarProvider } from "../ui/sidebar";
import { useGetProject } from "@/hooks/useProject";
import { useParams } from "next/navigation";
import SidebarLoading from "./sidebarLoading";
import SideBarHead from "./sidebarHeader";
import SidebarChannels from "./sidebarChannels";
import { useGetChannels } from "@/hooks/useChannel";

export default function SideBar() {
  const { projectId } = useParams() as { projectId: string };
  const { data, isSuccess, isLoading, isError } = useGetProject(projectId);

  const {
    data: channelsData,
    isSuccess: channelsSuccess,
    isLoading: channelsLoading,
    isError: channelError,
  } = useGetChannels({ projectId, isEnabled: true });

  const channels =
    channelsData?.data.map((channel) => ({
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
      <Sidebar className="absolute top-0 left-0 z-0 border-none">
        <SideBarHead projectData={data} />
        <SidebarContent className="bg-primary">
          <SidebarChannels channels={channels} />
        </SidebarContent>
      </Sidebar>
    );
}
