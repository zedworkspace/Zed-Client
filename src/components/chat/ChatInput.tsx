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
    setFile,
    filePreview,
    setFilePreview,
    showPicker,
    setShowPicker,
    handleSend,
    handleFileChange,
    addEmoji,
    isPending
  } = useChatInput({
    channelId,
    userId,
    userProfileImg,
    userName,
  });

  
  const handleEnter = (e:React.KeyboardEvent<HTMLInputElement>) =>{
      if (e.key === "Enter" && !e.shiftKey) {  
        e.preventDefault();
        handleSend();
      }
  }

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
          onKeyDown={handleEnter}
        />

        <EmojiPickerButton
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          addEmoji={addEmoji}
        />

        <FileUploadButton 
          onChange={handleFileChange} 
          onKeyDown = {handleEnter}
        />

        <SendButton
          onClick={handleSend}
          isPending ={isPending}
        />
      </div>
    </div>
  );
};

export default ChatInput;
