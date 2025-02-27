"use client";
import { useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { Input } from "../ui/input";
import {SendHorizonalIcon } from "lucide-react";
// import { useSendMessage } from "@/hooks/useMessage";

const ChatInput = ({ channelId, userId, userProfileImg, userName }: { channelId: string; userId: string;  userProfileImg:string; userName:string  }) => {
  const { sendMessage } = useSocket();
  const [newMessage, setNewMessage] = useState("");
    // const {mutate,data,} = useSendMessage(userId)

    // console.log(data,'data from send message');


    const handleSend = () => {
        if (newMessage.trim()) {
          const messageData = {
            channelId,
            senderId: {
                name: userName,
              _id: userId, 
              profileImg: userProfileImg,  // ✅ Include profile image
            },
            content: newMessage,
            type: "text",
          };

          console.log(messageData,'messagedatadd.....');
    
          sendMessage(messageData); // ✅ Send message with profile data
          setNewMessage("");
        }
      };

  return (
    <div className="flex mt-2 relative mr-5 ml-5">
      <Input
        type="text"
        className="flex-1 p-2 border-none focus-visible:ring-0 rounded-md "
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <SendHorizonalIcon onClick={handleSend} className="absolute right-3 w-5 h-5 top-2"/>
      {/* <button onClick={handleSend} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
        Send
      </button> */}
    </div>
  );
};

export default ChatInput;
