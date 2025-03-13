import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

interface EmojiPickerButtonProps {
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
  addEmoji: (emojiObject: { emoji: string }) => void;
}

const EmojiPickerButton = ({ 
  showPicker, 
  setShowPicker, 
  addEmoji 
}: EmojiPickerButtonProps) => {
  return (
    <>
      <BsEmojiSmile 
        onClick={() => setShowPicker(!showPicker)} 
        className="absolute left-5 cursor-pointer w-5 h-5 text-gray-500" 
      />
      
      {showPicker && (
        <div className="absolute bottom-0 mt-2">
          <EmojiPicker onEmojiClick={addEmoji} />
        </div>
      )}
    </>
  );
};

export default EmojiPickerButton;