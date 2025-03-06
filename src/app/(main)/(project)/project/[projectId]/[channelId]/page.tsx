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

  const { data: listsData } = useGetLists({ boardId: channelId });

  const {data} = useGetProfile(userId)

  // ✅ Fetch only client-side data inside useEffect
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

  if (channelType === "board")
    return <Board board={boardData?.data} lists={listsData?.data} />;

  return (
    <TextChannel
      channelId={channelId}
      userId={userId}
      userName={data?.name || "Anonymous"}
      userProfileImg={data?.profileImg || ""}
    />
  );
}
