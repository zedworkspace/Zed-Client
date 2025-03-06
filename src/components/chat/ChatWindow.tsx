/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { useGetMessages } from "@/hooks/useMessage";
import Image from "next/image";
import { format } from "date-fns";
import { UserIcon } from "lucide-react";
import { Message } from "@/interface/messageInterface";

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "MMM d, yyyy");
};

const groupMessagesByDate = (messages: Message[]) => {
  return messages.reduce((acc, message) => {
    const dateKey = new Date(message.createdAt).toISOString().split("T")[0];

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(message);

    return acc;
  }, {} as Record<string, Message[]>);
};

const ChatWindow = ({ channelId, userId }: { channelId: string; userId: string }) => {
  const { joinRoom, socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const { data } = useGetMessages(channelId);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    joinRoom(channelId, userId);

    if (data?.messages) {
      setMessages(data.messages);
    }

    // Emit readMessage event when user joins
    socket?.emit("readMessage", { channelId, userId });

    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => [
        ...prev,
        { ...message, createdAt: message.createdAt || new Date().toISOString() },
      ]);

      // Auto mark as read when a new message arrives
      socket?.emit("readMessage", { channelId, userId });
    };

    const handleMessagesRead = ({ channelId: updatedChannelId, userId: updatedUserId }: { channelId: string; userId: string }) => {
      if (updatedChannelId === channelId) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.readBy.includes(updatedUserId) ? msg : { ...msg, readBy: [...msg.readBy, updatedUserId] }
          )
        );
      }
    };

    socket?.on("receiveMessage", handleReceiveMessage);
    socket?.on("messagesRead", handleMessagesRead);

    return () => {
      socket?.off("receiveMessage", handleReceiveMessage);
      socket?.off("messagesRead", handleMessagesRead);
    };
  }, [channelId, socket, data]);

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col overflow-y-scroll scrollbar-hide mx-5 pb-5 mt-14">
      <div className="flex-1 pr-2 space-y-5 scrollbar-hide overflow-y-auto">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className="text-center text-gray-400 text-sm mb-2 border-b">{formatDate(date)}</div>

            {msgs.map((msg, index) => (
              <div key={index} className="flex items-start gap-3 p-2 hover:bg-[#1111] rounded-lg">
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

                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-blue-100">{msg.senderId.name}</p>
                    <p className="text-xs text-gray-300">
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>

                  {msg.fileUrl && msg.content ? (
                    <div className="mt-2 space-y-2">
                      <Image src={msg.fileUrl} alt="Sent Image" width={200} height={200} className="rounded-lg" />
                      <p className="text-gray-100">{msg.content}</p>
                    </div>
                  ) : msg.fileUrl ? (
                    <Image src={msg.fileUrl} alt="Sent Image" width={200} height={200} className="rounded-lg mt-2 w-56 h-44" />
                  ) : (
                    <p className="text-gray-100">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={chatRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
