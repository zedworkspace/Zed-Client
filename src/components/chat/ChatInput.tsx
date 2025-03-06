"use client";
import { useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { Input } from "../ui/input";
import { SendHorizonalIcon, PaperclipIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useSendFile } from "@/hooks/useMessage";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";


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
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const {mutateAsync } = useSendFile(channelId)

  const handleSend = async () => {
    if (!newMessage.trim() && !file) return; 

    let fileUrl = "";

    if (file) {
      const formData = new FormData();
      formData.append("channelId", channelId);
      formData.append("fileMessage", file);

       const res = await mutateAsync(formData);
       fileUrl = res.fileUrl

    }

    const messageData = {
      channelId,
      senderId: {
        name: userName,
        _id: userId,
        profileImg: userProfileImg,
      },
      content: newMessage || "", 
      fileUrl, 
      type: fileUrl ? "image" : "text",
      // readBy:[userId]
    };

    sendMessage(messageData); 

    setNewMessage("");
    setFile(null);
    setFilePreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFilePreview(previewUrl);
    }
  };

  const addEmoji = (emojiObject: { emoji: string }) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className="relative flex flex-col gap-3 mt-2 mx-5">
       {/* Image Preview Outside ChatInput   */}
      {filePreview && (
        <div className="absolute -bottom-2 left-0  flex justify-center">
          <div className="relative w-40 h-40   rounded-lg shadow-md">
            <Image
              src={filePreview}
              alt="Selected Image"
              width={160}
              height={160}
              className="rounded-lg object-cover "
            />
            <button
              onClick={() => {
                setFile(null);
                setFilePreview(null);
              }}
              className="absolute top-0 right-0 bg-black text-white rounded-full p-1"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 relative">
      <Input
        type="text"
        className="flex-1 pl-24 ps-10 border-none focus-visible:ring-0 rounded-md bg-primary outline-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-offset-0"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
        <label className="cursor-pointer absolute left-14">
          <PaperclipIcon className="w-5 h-5 text-gray-500" />
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <SendHorizonalIcon
          onClick={handleSend}
          className={`w-5 h-5 cursor-pointer absolute right-5 text-gray-500 `}
        />
           {/* <button
          onClick={() => setShowPicker(!showPicker)}
          className="absolute left-5 "
        >
          😀
        </button> */}
        <BsEmojiSmile onClick={() => setShowPicker(!showPicker)}
          className="absolute left-5 "/>
        
      </div>
      {showPicker && (
        <div className="absolute bottom-0 mt-2">
          <EmojiPicker onEmojiClick={addEmoji} />
        </div>
      )}

    </div>
  );
};

export default ChatInput;
