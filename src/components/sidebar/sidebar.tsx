"use client";
import React from "react";
import SideBarHead from "./sidebarHeader";
import { useParams } from "next/navigation";
import { useGetProject } from "@/hooks/useProject";
import { useGetChannels } from "@/hooks/useChannel";
import SidebarLoading from "./sidebarLoading";
import SidebarContents from "./sidebarContents";

export default function Sidebar() {
  const { projectId } = useParams() as { projectId: string };

  const {
    data: projectData,
    isLoading: projectLoading,
    isError: projectError,
  } = useGetProject(projectId);

  const {
    data: channelsData,
    isLoading: channelsLoading,
    isError: channelsError,
  } = useGetChannels({ projectId, isEnabled: true });

  const isLoading = projectLoading || channelsLoading;
  const isError = projectError || channelsError;

  if (isLoading) return <SidebarLoading />;

  if (isError) return <div>Something happened</div>;

  return (
    <div className="w-1/4 h-full">
      <SideBarHead projectData={projectData} />
      <SidebarContents channelData={channelsData} />
    </div>
  );
}
