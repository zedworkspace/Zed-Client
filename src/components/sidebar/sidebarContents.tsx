"use client";
import React, { useEffect, useState } from "react";
import { Github, Kanban, MessagesSquare, Volume2 } from "lucide-react";
import { IGetChannels } from "@/interface/channelInterface";
import SidebarAccordion from "./sidebarAccordion";
import { IGetBoards } from "@/interface/boardInterface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Separator } from "../ui/separator";
import { useGetNotification } from "@/hooks/useMessage";
import { useParams } from "next/navigation";
import { connectSocket, getSocket } from "@/utils/socket";

import Image from "next/image";
import { useProfileStore } from "@/store/profileStore";
import { useGetProfile } from "@/hooks/useProfile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  channelData?: IGetChannels;
  boardData?: IGetBoards;
};

export default function SidebarContents({ channelData, boardData }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const path = pathName.split("/")[3];

  const { channelId, projectId }: { channelId: string; projectId: string } =
    useParams();

  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [socketChannelId, setSocketChannelId] = useState("");
  const { data } = useGetNotification(channelId);

  useEffect(() => {
    if (data) {
      const counts = Object.fromEntries(
        data.map(({ _id, count }: { _id: string; count: number }) => [
          _id,
          count,
        ])
      );
      setUnreadCounts(counts);
    }
  }, [data]);

  const socket = getSocket() || connectSocket();
  useEffect(() => {
    const handleNewUnreadMessage = ({
      channelId: newChannelId,
      count,
      senderId,
    }: {
      channelId: string;
      count: number;
      senderId: string;
    }) => {
      setSocketChannelId(channelId);
      console.log(channelId, newChannelId, "idsss");
      if (userId !== senderId) {
        setUnreadCounts((prevCounts) => ({
          ...prevCounts,
          [channelId]: (prevCounts[channelId] || 0) + count,
        }));
      }
    };

    socket.on("newUnreadMessage", handleNewUnreadMessage);

    return () => {
      socket.off("newUnreadMessage", handleNewUnreadMessage);
    };
  }, []);

  const textHandleClick = (channelId: string, type: string) => {
    // socket.emit("readMessage", { channelId, userId }); // Send read event

    sessionStorage.setItem("channelType", type);
    router.replace(`/project/${projectId}/${channelId}`);

    setUnreadCounts((prevCounts) => ({
      ...prevCounts,
      [channelId]: 0,
    }));
  };

  const voiceHandleClick = (channelId: string, type: string) => {
    sessionStorage.setItem("channelType", type);
    router.replace(`/project/${projectId}/${channelId}`);
  };
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || "";
      setUserId(storedUserId);
    }
  }, []);
  const { onOpen, setProfileId } = useProfileStore();
  const { data: profileData } = useGetProfile(userId);
  console.log(profileData,"profiledata")

  return (
    <div className="h-3/4 bg-pri pt-4 flex flex-col justify-between bg-black">
      <div className="space-y-3 overflow-auto h-full">
        {/* github */}
        <div className="px-2" onClick={() => router.replace("git-hub")}>
          <div
            className={`w-full gap-2 cursor-pointer flex items-center p-2 text-muted-foreground hover:bg-secondary/50 hover:text-white transition-colors duration-200 rounded-md h-10 font-bold ${
              path === "git-hub" ? "bg-secondary/80" : ""
            } }`}
          >
            <Github className="size-5" />
            <span className="text-sm font-bold">Git Hub</span>
          </div>
        </div>
        <Separator className="w-[95%] m-auto bg-white/30 h-0.5" />

        {/* board */}
        <SidebarAccordion
          Icon={Kanban}
          accordianValue="item-3"
          title="YOUR BOARDS"
          channelData={boardData?.data}
          type="board"
          handleClick={voiceHandleClick}
        />
        {/* Text channels  */}
        <SidebarAccordion
          Icon={MessagesSquare}
          accordianValue="item-1"
          title="TEXT CHANNELS"
          channelData={channelData?.data.textChannels}
          type="text"
          handleClick={textHandleClick}
          unreadCounts={unreadCounts}
          socketChannelId={socketChannelId}
        />
        {/* Voice channels */}
        <SidebarAccordion
          Icon={Volume2}
          accordianValue="item-2"
          title="VOICE CHANNELS"
          channelData={channelData?.data.voiceChannels}
          type="voice"
          handleClick={voiceHandleClick}
        />
      </div>
      <div className="px-2 mb-2">
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-white hover:bg-secondary/30 transition-colors duration-200 h-14 font-medium cursor-pointer"
          onClick={() => {
            setProfileId(userId);
            onOpen();
          }}
        >
          <Avatar className="h-10 w-10 border border-secondary/20">
            {profileData?.profileImg ? (
              <AvatarImage src={profileData.profileImg} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-secondary text-white">
                {profileData?.name?.[0] || "P"}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">
              {profileData?.name || "Abhay pc"}
            </span>
            {/* <span className="text-xs text-muted-foreground/70 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Online
            </span> */}
          </div>
        </button>
      </div>
    </div>
  );
}
