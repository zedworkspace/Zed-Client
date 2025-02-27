/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { useGetMessages } from "@/hooks/useMessage";
import Image from "next/image";
import { UserIcon } from "lucide-react";

interface Message {
  _id?: string;
  senderId: {
    _id: string;
    name: string;
    profileImg?: string;
  };
  content: string;
  type: string;
  createdAt: string;
  channelId: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Ensures AM/PM format
  });
};

const ChatWindow = ({ channelId }: { channelId: string; userId: string }) => {
  const { joinRoom, socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const { data } = useGetMessages(channelId);
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    joinRoom(channelId);

    // Merge API messages initially
    if (data?.messages) {
      setMessages(data.messages);
    }

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => [
        ...prev,
        {
          ...message,
          createdAt: message.createdAt || new Date().toISOString(), // Ensure createdAt exists
        },
      ]);
    };

    socket?.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket?.off("receiveMessage", handleReceiveMessage);
    };
  }, [channelId, socket, data]);

  return (
    <div className="h-[560px] rounded-md p-4 flex flex-col overflow-hidden ">
      {/* Chat Messages */}
      <div className="flex-1 pr-2 space-y-3 scrollbar-hide overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-2 hover:bg-[#1111] rounded-lg"
          >{
            msg.senderId.profileImg?
            <Image
              src={msg.senderId.profileImg || "/default-avatar.png"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full w-10 h-10"
            />
            :
            <UserIcon className="rounded-full w-10 h-10"/>
          }
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-blue-100">{msg.senderId.name} </p>
                
                <p className="text-xs text-gray-300">
                  {msg.createdAt ? formatDate(msg.createdAt) : "Just now"}
                </p>
              </div>
              <div>
                <p className="text-gray-100">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={chatRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
