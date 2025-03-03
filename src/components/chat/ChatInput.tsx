"use client";
import { useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { Input } from "../ui/input";
import { SendHorizonalIcon, PaperclipIcon, XIcon } from "lucide-react";
import { sendFile } from "@/services/messageServices";
import Image from "next/image";

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
  const [isUploading, setIsUploading] = useState(false);

  const handleSend = async () => {
    if (!newMessage.trim() && !file) return; // Prevent empty messages

    setIsUploading(true);
    let fileUrl = "";

    if (file) {
      // Upload file first
      const formData = new FormData();
      formData.append("channelId", channelId);
      formData.append("fileMessage", file);

      try {
        const response = await sendFile(formData);
        fileUrl = response?.fileUrl || ""; // Get the file URL from the API response
      } catch (error) {
        console.error("File upload failed:", error);
        setIsUploading(false);
        return;
      }
    }

    // Prepare message data
    const messageData = {
      channelId,
      senderId: {
        name: userName,
        _id: userId,
        profileImg: userProfileImg,
      },
      content: newMessage || "", // Send text if available
      fileUrl: fileUrl || "", // Send file URL if available
      type: fileUrl ? "image" : "text",
    };

    sendMessage(messageData); // Send message via socket

    // Reset input fields
    setNewMessage("");
    setFile(null);
    setFilePreview(null);
    setIsUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFilePreview(previewUrl);
    }
  };

  return (
    <div className="relative flex flex-col gap-3 mt-2">
      {/* Image Preview Outside ChatInput */}
      {filePreview && (
        <div className="absolute bottom-0 left-0  flex justify-center">
          <div className="relative w-40 h-40   rounded-lg shadow-md">
            <Image
              src={filePreview}
              alt="Selected Image"
              width={160}
              height={160}
              className="rounded-lg object-cover"
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

      <div className="flex items-center gap-3">
        <Input
          type="text"
          className="flex-1 p-2 border-none focus-visible:ring-0 rounded-md"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={isUploading}
        />
        <label className="cursor-pointer">
          <PaperclipIcon className="w-5 h-5 text-gray-500" />
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <SendHorizonalIcon
          onClick={handleSend}
          className={`w-5 h-5 cursor-pointer ${isUploading ? "text-gray-400" : "text-blue-500"}`}
        />
      </div>
    </div>
  );
};

export default ChatInput;
