"use client";
import Board from "@/components/board/board";
import TextChannel from "@/components/chat/TextChannel";
import { BoardSocketProvider } from "@/context/boardSocketProvider";
import { useGetBoardById } from "@/hooks/useBoard";
import { useGetLists } from "@/hooks/useList";
import { useGetProfile } from "@/hooks/useProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [userId, setUserId] = useState("");
  const [channelType, setChannelType] = useState("");

  const { channelId, projectId } = useParams() as {
    channelId: string;
    projectId: string;
  };

  const queryClient = useQueryClient()
  const { data: listsData, isSuccess } = useGetLists({ boardId: channelId,isEnabled:channelType === "board" });

  const { data } = useGetProfile(userId);

  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "";
    const type = sessionStorage.getItem("channelType") || "";
    setUserId(storedUserId);
    setChannelType(type);
  }, []);

  const { data: boardData } = useGetBoardById({
    boardId: channelId,
    projectId,
  });

  if (channelType === "voice") return <div>This is voice channel</div>; // here we render video based component

  if (channelType === "board" && isSuccess)
    return (
      <BoardSocketProvider>
        <Board board={boardData?.data} lists={listsData?.data} />
      </BoardSocketProvider>
    );

  return (
    <TextChannel
      channelId={channelId}
      userId={userId}
      userName={data?.name || "Anonymous"}
      userProfileImg={data?.profileImg || ""}
    />
  );
}
