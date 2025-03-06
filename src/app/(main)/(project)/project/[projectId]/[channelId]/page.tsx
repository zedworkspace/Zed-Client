"use client";
import Board from "@/components/board/board";
import TextChannel from "@/components/chat/TextChannel";
import { BoardSocketProvider } from "@/context/boardSocketProvider";
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

  const { data } = useGetProfile(userId);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "";
    const type = sessionStorage.getItem("channelType") || "";
    setUserId(storedUserId);
    setChannelType(type);
  }, []);

  if (channelType === "voice") return <div>This is voice channel</div>; // here we render video based component

  if (channelType === "board")
    return (
      <BoardSocketProvider>
        <Board boardId={channelId} projectId={projectId} />
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
