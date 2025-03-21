"use client";
import Board from "@/components/board/board";
import ChatLoading from "@/components/chat/ChatLoading";
import TextChannel from "@/components/chat/TextChannel";
import VoiceChannel from "@/components/voiceChannel/VoiceChannel";
import VoiceHeader from "@/components/voiceChannel/VoiceHeader";
import { BoardSocketProvider } from "@/context/boardSocketProvider";
import { useGetChannelById } from "@/hooks/useChannel";
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
  const enabled = channelType === "voice" || channelType === "text";



  const {
    data: channelData,
    isSuccess: channelSuccess,
    isLoading: channelLoading,
  } = useGetChannelById({
    channelId,
    projectId,
    enabled,
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "";
    const type = sessionStorage.getItem("channelType") || "";
    setUserId(storedUserId);
    setChannelType(type);
  }, []);

  const isSuccess = channelSuccess;
  const isLoading = channelLoading;
  if (channelType === "voice") return <> <VoiceHeader data={channelData?.data}/><VoiceChannel/></> ; // here we render video based component

  if (channelType === "board")
    return (
      <BoardSocketProvider>
        <Board boardId={channelId} projectId={projectId} />
      </BoardSocketProvider>
    );

    if(!isSuccess && sessionStorage.getItem("channelType")=== 'text'){
      return <ChatLoading/>
    }
    if(!isSuccess && sessionStorage.getItem('channelType') === 'voice'){
      return <div>Loading voice channel</div>
    }

  if (channelType === "text") {
    if (isLoading) {
      <div>channel loading....</div>;
    } else if (isSuccess)
      return (
        <TextChannel
          channelId={channelId}
          projectId={projectId}
          userId={userId}
          userName={data?.name || "Anonymous"}
          userProfileImg={data?.profileImg || ""}
          data={channelData?.data}
        />
      );
  }
}
