"use client";
import Board from "@/components/board/board";
import TextChannel from "@/components/chat/TextChannel";
import { useGetBoardById } from "@/hooks/useBoard";
import { useGetLists } from "@/hooks/useList";
import { useGetProfile } from "@/hooks/useProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [userId, setUserId] = useState("");
  const [channelType, setChannelType] = useState("");
  const { channelId, projectId } = useParams() as {
    channelId: string;
    projectId: string;
  };
  const { data: profileData } = useGetProfile(userId);

  const { data: listsData } = useGetLists({ boardId: channelId });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || "";
      setUserId(storedUserId);
      const type = sessionStorage.getItem("channelType") || "";
      setChannelType(type);
    }
  }, []);

  const { data: boardData } = useGetBoardById({
    boardId: channelId,
    projectId,
  });

  if (channelType === "voice") return <div>This is voice channel</div>; // here we render video based component

  if (channelType === "board")
    return <Board board={boardData?.data} lists={listsData?.data} />;

  return (
    <TextChannel
      channelId={channelId}
      userId={userId}
      userName={profileData?.name}
      userProfileImg={profileData?.profileImg}
    />
  );
}
