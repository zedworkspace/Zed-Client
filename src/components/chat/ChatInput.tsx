// File: /components/chat/ChatInput.tsx
"use client";
import { useChatInput } from "@/hooks/useChatInput";
import MessageField from "./input/MessageField";
import FileUploadButton from "./input/FileUploadButton";
import EmojiPickerButton from "./input/EmojiPickerButton";
import SendButton from "./input/SendButton";
import FilePreview from "./input/FilePreview";

interface ChatInputProps {
  channelId: string;
  userId: string;
  userProfileImg: string;
  userName: string;
}

const ChatInput = ({
  channelId,
  userId,
  userProfileImg,
  userName,
}: ChatInputProps) => {
  const {
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
    addEmoji,
  } = useChatInput({
    channelId,
    userId,
    userProfileImg,
    userName,
  });

  return (
    <div className="relative flex flex-col gap-3 -mt-2 mx-5">
      {filePreview && (
        <FilePreview
          filePreview={filePreview}
          onRemove={() => {
            setFile(null);
            setFilePreview(null);
          }}
        />
      )}

      <div className="flex items-center gap-3 relative">
        <MessageField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <EmojiPickerButton
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          addEmoji={addEmoji}
        />

        <FileUploadButton onChange={handleFileChange} />

        <SendButton
          onClick={handleSend}
          isDisabled={!newMessage.trim() && !file}
        />
      </div>
    </div>
  );
};

export default ChatInput;
