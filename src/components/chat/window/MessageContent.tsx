/* eslint-disable @next/next/no-img-element */
import { Message } from "@/interface/messageInterface";

interface MessageContentProps {
  message: Message;
}

const MessageContent = ({ message }: MessageContentProps) => {
  const { fileUrl, content } = message;

  if (fileUrl && content) {
    return (
      <div className="mt-2 space-y-2">
        <div className = "rounded-md overflow-hidden max-w-sm">
          <img
            src={fileUrl}
            alt="Sent Image"
            className="max-w-full max-h-60 object-contain rounded-md"
          />
        </div>
        <p className="text-gray-100">{content}</p>
      </div>
    );
  }

  if (fileUrl) {
    return (
      <div
        className="mt-2  rounded-md overflow-hidden max-w-sm"
      >
        <img
          src={fileUrl}
          alt="Sent Image"
          className="max-w-full  max-h-60 object-contain rounded-md"
        />
      </div>
    );
  }

  return <p className="text-gray-100">{content}</p>;
};

export default MessageContent;
