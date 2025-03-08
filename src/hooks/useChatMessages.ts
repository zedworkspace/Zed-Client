// File: /hooks/useChatMessages.ts
'use client'
import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { useGetMessages } from "@/hooks/useMessage";
import { Message } from "@/interface/messageInterface";

export const useChatMessages = (channelId: string, userId: string) => {
  const { joinRoom, socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const { data } = useGetMessages(channelId);
  const chatRef = useRef<HTMLDivElement>(null);

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

    const handleMessagesRead = ({ 
      channelId: updatedChannelId, 
      userId: updatedUserId 
    }: { 
      channelId: string; 
      userId: string 
    }) => {
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
  }, [channelId, userId, socket, data, joinRoom]);

  const groupedMessages = groupMessagesByDate(messages);

  return { messages, groupedMessages, chatRef };
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