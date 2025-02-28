"use client";
import TextChannel from "@/components/chat/TextChannel";
import { useGetProfile } from "@/hooks/useProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [userId, setUserId] = useState("");
  const { channelId } = useParams() as { channelId: string };
  const { data } = useGetProfile(userId);
  const channelType = sessionStorage.getItem("channelType");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || "";
      setUserId(storedUserId);
    }
  }, []);

  if (channelType === "voice") return <div>THis is voice channel</div>; // here we render video based component

  if (channelType === "board") return <div>This is Board</div>; // here we render based based component

  return (
    <TextChannel
      channelId={channelId}
      userId={userId}
      userName={data?.name}
      userProfileImg={data?.profileImg}
    />
  );
}
