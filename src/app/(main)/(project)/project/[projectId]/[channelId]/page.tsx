"use client";
import Board from "@/components/board/board";
import TextChannel from "@/components/chat/TextChannel";
import { useGetProfile } from "@/hooks/useProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const { channelId } = useParams() as { channelId: string }; // ✅ No need to delay this
  const [userId, setUserId] = useState(""); 
  const [channelType, setChannelType] = useState("");

  const {data} = useGetProfile(userId)

  // ✅ Fetch only client-side data inside useEffect
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "";
    const type = sessionStorage.getItem("channelType") || "";
    setUserId(storedUserId);
    setChannelType(type);
  }, []);

  // ✅ Render placeholder while client-side data is loading (prevents hydration mismatch)
  if (!userId || !channelType) return <div>Loading...</div>;

  if (channelType === "voice") return <div>This is voice channel</div>;
  if (channelType === "board") return <Board />;

  return (
    <TextChannel
      channelId={channelId}
      userId={userId}
      userName={data?.name || "Anonymous"}
      userProfileImg={data?.profileImg || ""}
    />
  );
}
