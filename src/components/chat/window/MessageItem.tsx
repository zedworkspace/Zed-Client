import { Message } from "@/interface/messageInterface";
import UserAvatar from "./UserAvatar";
import MessageContent from "./MessageContent";
import MessageTime from "./MessageTime";

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div className="flex items-start gap-3 p-2 py-3 hover:bg-[#1111] rounded-lg">
        
      <UserAvatar user={message.senderId} />
      
      <div className="flex flex-col">
        <div className="flex items-center space-x-2 ">
          <p className="font-medium text-blue-100">{message.senderId.name}</p>
          <MessageTime timestamp={message.createdAt} />
        </div>

        <MessageContent message={message} />
      </div>
    </div>
  );
};

export default MessageItem;