"use client";
import { SocketProvider } from "@/context/SocketProvider";
import React from "react";
import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { useGetChannelById } from "@/hooks/useChannel";
import { IChannel } from "@/interface/channelInterface";

type Props = {
  channelId: string;
  userId: string;
  userProfileImg: string;
  userName: string;
  projectId: string;
  data: IChannel;
};

export default function TextChannel({
  channelId,
  userId,
  userName,
  userProfileImg,
  projectId,
  data,
}: Props) {
  return (
    <SocketProvider>
      <div className="pb-4 w-full h-full flex flex-col justify-between ">
        <ChatHeader data={data} />

        <div className="flex flex-col justify-between">
          <ChatWindow channelId={channelId} userId={userId} />
          <div className="fixed bottom-0  w-[50vw] md:w-[65vw] lg:w-[78vw] px-4 bg-secondary h-14">
            <ChatInput
              channelId={channelId}
              userId={userId}
              userProfileImg={userProfileImg}
              userName={userName}
            />
          </div>
        </div>
      </div>
    </SocketProvider>
  );
}
