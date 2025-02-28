"use client";
import { useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { Input } from "../ui/input";
import { Plus, SendHorizonalIcon } from "lucide-react";
// import { useSendMessage } from "@/hooks/useMessage";

const ChatInput = ({
  channelId,
  userId,
  userProfileImg,
  userName,
}: {
  channelId: string;
  userId: string;
  userProfileImg: string;
  userName: string;
}) => {
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
          profileImg: userProfileImg, // ✅ Include profile image
        },
        content: newMessage,
        type: "text",
      };

      console.log(messageData, "messagedatadd.....");

      sendMessage(messageData); // ✅ Send message with profile data
      setNewMessage("");
    }
  };

  return (
    <div className="flex mt-2 relative mx-5 items-center">
      <Input
        type="text"
        className="flex-1 p-2 ps-10 border-none focus-visible:ring-0 rounded-md bg-primary outline-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-offset-0"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Plus onClick={() => {}} className="absolute left-3 w-5 h-5" />
      <SendHorizonalIcon
        onClick={handleSend}
        className="absolute right-3 w-5 h-5"
      />
    </div>
  );
};

export default ChatInput;
