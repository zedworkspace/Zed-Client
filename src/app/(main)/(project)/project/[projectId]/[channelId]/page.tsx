"use client";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatWindow from "@/components/chat/ChatWindow";
import { SocketProvider } from "@/context/SocketProvider";
import { useGetProfile } from "@/hooks/useProfile";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [userId, setUserId] = useState("");
  const pathname = usePathname();

  const pathSegments = pathname.split("/");
  const channelId = pathSegments[pathSegments.length - 1];
  console.log(channelId, "channelId");

  const { data } = useGetProfile(userId);

  const userProfile = data?.profileImg;
  const userName = data?.name;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || "";
      setUserId(storedUserId);
    }
  }, []);

  console.log(userId, "userIddded");

  return (
    <SocketProvider>
      <div className="pb-4 w-full h-[calc(100vh-4rem)] flex flex-col justify-between">
        <ChatHeader />
        <ChatWindow channelId={channelId} userId={userId} />
        <ChatInput
          channelId={channelId}
          userId={userId}
          userProfileImg={userProfile}
          userName={userName}
        />
      </div>
    </SocketProvider>
  );
}
