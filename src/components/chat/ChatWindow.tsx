// File: /components/chat/ChatWindow.tsx
"use client";
import { useEffect } from "react";
import { useChatMessages } from "@/hooks/useChatMessages";
import DateSeparator from "./window/DateSeparator";
import MessageGroup from "./window/MessageGroup";

const ChatWindow = ({ channelId, userId }: { channelId: string; userId: string }) => {
  const { messages, groupedMessages, chatRef } = useChatMessages(channelId, userId);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatRef]);

  return (
    <div className="flex flex-col overflow-y-scroll scrollbar-hide mx-5 pb-16 mt-14">
      <div className="flex-1 pr-2 space-y-10 scrollbar-hide overflow-y-auto">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <DateSeparator date={date} />
            <MessageGroup messages={msgs} />
          </div>
        ))}
        <div ref={chatRef} />
      </div>
    </div>
  );
};

export default ChatWindow;