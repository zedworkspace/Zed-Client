'use client'
import ChatInput from "@/components/chat/ChatInput";
import ChatWindow from "@/components/chat/ChatWindow";
import { SocketProvider } from "@/context/SocketProvider";
import { useGetProfile } from "@/hooks/useProfile";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [userId, setUserId] = useState("");
  const pathname = usePathname()

  const pathSegments = pathname.split("/");
  const channelId = pathSegments[pathSegments.length - 1]; 
  console.log(channelId,'channelId');

  const {data} = useGetProfile(userId)

  const userProfile = data?.profileImg
  const userName = data?.name
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || "";
      setUserId(storedUserId);
    }
  }, []);

  console.log(userId,'userIddded');

  return (
    <SocketProvider>
      <div className="p-4  w-full">
      <ChatWindow channelId={channelId} userId={userId}/>
      <ChatInput channelId={channelId} userId={userId}  userProfileImg={userProfile} userName={userName}/>
      </div>
    </SocketProvider>
  );
}
