"use client";
import Board from "@/components/board/board";
import TextChannel from "@/components/chat/TextChannel";
import { useGetProfile } from "@/hooks/useProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [userId, setUserId] = useState("");
  const [channelType, setChannelType] = useState("");
  const { channelId } = useParams() as { channelId: string };
  const { data } = useGetProfile(userId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || "";
      setUserId(storedUserId);
      const type = sessionStorage.getItem("channelType") || "";
      setChannelType(type);
    }
  }, []);

  if (channelType === "voice") return <div>This is voice channel</div>; // here we render video based component
  
  if (channelType === "board") return <Board  />

  return (
    <TextChannel
      channelId={channelId}
      userId={userId}
      userName={data?.name}
      userProfileImg={data?.profileImg}
    />
  );
}
