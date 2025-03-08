import React, { useEffect, useState } from "react";
import { Kanban, MessagesSquare, Volume2 } from "lucide-react";
import { IGetChannels } from "@/interface/channelInterface";
import SidebarAccordion from "./sidebarAccordion";
import { IGetBoards } from "@/interface/boardInterface";
import { useGetNotification } from "@/hooks/useMessage";
import { useParams } from "next/navigation";
import { connectSocket, getSocket } from "@/utils/socket";
import { useRouter } from "next/navigation";

type Props = {
  channelData?: IGetChannels;
  boardData?: IGetBoards;
};

export default function SidebarContents({ channelData, boardData }: Props) {
  const router = useRouter();

  const userId = localStorage.getItem("userId");

  const { channelId }: { channelId: string } = useParams();

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
    router.replace(`${channelId}`);

    setUnreadCounts((prevCounts) => ({
      ...prevCounts,
      [channelId]: 0,
    }));
  };

  const voiceHandleClick = (channelId: string, type: string) => {
    sessionStorage.setItem("channelType", type);
    router.replace(`${channelId}`);
  };

  return (
    <div className="h-3/4 bg-primary pt-4 space-y-2">
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
  );
}
