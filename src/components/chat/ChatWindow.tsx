/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { useGetMessages } from "@/hooks/useMessage";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import { Message } from "@/interface/messageInterface";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ChatWindow = ({ channelId }: { channelId: string }) => {
  const { joinRoom, socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const { data } = useGetMessages(channelId);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    joinRoom(channelId);

    if (data?.messages) {
      setMessages(data.messages);
    }

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => [
        ...prev,
        { ...message, createdAt: message.createdAt || new Date().toISOString() },
      ]);
    };

    socket?.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket?.off("receiveMessage", handleReceiveMessage);
    };
  }, [channelId, socket, data]);

  return (
    <div className="h-[600px] rounded-md p-4 flex flex-col overflow-hidden pt-16">
      {/* Chat Messages */}
      <div className="flex-1 pr-2 space-y-3 scrollbar-hide overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-2 hover:bg-[#1111] rounded-lg"
          >
            {/* Sender Profile Image */}
            {msg.senderId.profileImg ? (
              <Image
                src={msg.senderId.profileImg}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full w-10 h-10"
              />
            ) : (
              <UserIcon className="rounded-full w-10 h-10 text-gray-300" />
            )}

            {/* Message Content */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-blue-100">{msg.senderId.name}</p>
                <p className="text-xs text-gray-300">
                  {msg.createdAt ? formatDate(msg.createdAt) : "Just now"}
                </p>
              </div>

              {/* Message Text or Image */}
              {msg.fileUrl && msg.content ? (
                <div className="mt-2 space-y-2">
                  <Image
                    src={msg.fileUrl}
                    alt="Sent Image"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                  <p className="text-gray-100">{msg.content}</p>
                </div>
              ) : msg.fileUrl ? (
                <Image
                  src={msg.fileUrl}
                  alt="Sent Image"
                  width={200}
                  height={200}
                  className="rounded-lg mt-2"
                />
              ) : (
                <p className="text-gray-100">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={chatRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
