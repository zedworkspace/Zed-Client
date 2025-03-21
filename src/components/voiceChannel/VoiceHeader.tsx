import React from 'react'
import { IChannel } from "@/interface/channelInterface";
import { Volume2 } from 'lucide-react';

const VoiceHeader = ({data}:{data? : IChannel}) => {
  return (
    <div className="p-3 sticky border-b border-primary/50 text-base flex gap-2  bg-black text-white/70">
      <Volume2 className="" />
      {data?.name}
    </div>
  )
}

export default VoiceHeader
