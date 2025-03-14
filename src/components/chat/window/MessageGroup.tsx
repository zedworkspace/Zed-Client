import { Message } from "@/interface/messageInterface";
import MessageItem from "./MessageItem";

interface MessageGroupProps {
  messages: Message[];
}

const MessageGroup = ({ messages }: MessageGroupProps) => {
  return (
    <>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </>
  );
};

export default MessageGroup;