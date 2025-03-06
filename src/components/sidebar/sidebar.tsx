"use client";
import React from "react";
import SideBarHead from "./sidebarHeader";
import { useParams } from "next/navigation";
import { useGetProject } from "@/hooks/useProject";
import { useGetChannels } from "@/hooks/useChannel";
import SidebarLoading from "./sidebarLoading";
import SidebarContents from "./sidebarContents";
import { useGetBoards } from "@/hooks/useBoard";

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

  const {
    data: boardData,
    isLoading: boardLoading,
    isError: boardError,
  } = useGetBoards({ projectId });

  const isLoading = projectLoading || channelsLoading || boardLoading;
  const isError = projectError || channelsError || boardError;

  if (isLoading) return <SidebarLoading />;

  if (isError) return <div>Something happened</div>;

  return (
    <div className="w-64 h-full">
      <SideBarHead projectData={projectData} />
      <SidebarContents channelData={channelsData} boardData={boardData} />
    </div>
  );
}
