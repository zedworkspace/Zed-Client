// File: /hooks/useChatInput.ts
import { useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { useSendFile } from "@/hooks/useMessage";

interface UseChatInputProps {
  channelId: string;
  userId: string;
  userProfileImg: string;
  userName: string;
}

export const useChatInput = ({ 
  channelId, 
  userId, 
  userProfileImg, 
  userName 
}: UseChatInputProps) => {
  const { sendMessage } = useSocket();
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const { mutateAsync } = useSendFile(channelId);

  const handleSend = async () => {
    if (!newMessage.trim() && !file) return;

    let fileUrl = "";

    if (file) {
      const formData = new FormData();
      formData.append("channelId", channelId);
      formData.append("fileMessage", file);

      const res = await mutateAsync(formData);
      fileUrl = res.fileUrl;
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

  return {
    newMessage,
    setNewMessage,
    file,
    setFile,
    filePreview,
    setFilePreview,
    showPicker,
    setShowPicker,
    handleSend,
    handleFileChange,
    addEmoji
  };
};