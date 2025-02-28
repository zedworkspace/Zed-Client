import { SocketProvider } from "@/context/SocketProvider";
import React from "react";
import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

type Props = {
  channelId: string;
  userId: string;
  userProfileImg: string;
  userName: string;
};

export default function TextChannel({
  channelId,
  userId,
  userName,
  userProfileImg,
}: Props) {
  return (
    <SocketProvider>
      <div className="pb-4 w-full h-[calc(100vh-4rem)] flex flex-col justify-between">
        <ChatHeader />
        <ChatWindow channelId={channelId} userId={userId} />
        <ChatInput
          channelId={channelId}
          userId={userId}
          userProfileImg={userProfileImg}
          userName={userName}
        />
      </div>
    </SocketProvider>
  );
}
