"use client";
import React from "react";
import { MessageCircle } from "lucide-react";
import { IChannel } from "@/interface/channelInterface";

export default function ChatHeader({ data }: { data?: IChannel }) {
  return (
      <div className="p-3 sticky border-b border-primary/50 text-base flex gap-2  bg-black text-white/70">
      <MessageCircle className="" />
      {data?.name}
    </div>
  );
}
