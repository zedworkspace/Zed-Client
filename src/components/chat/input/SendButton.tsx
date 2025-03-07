import { SendHorizonalIcon } from "lucide-react";

interface SendButtonProps {
  onClick: () => void;
  isDisabled: boolean;
}

const SendButton = ({ onClick, isDisabled }: SendButtonProps) => {
  return (
    <SendHorizonalIcon
      onClick={onClick}
      className={`w-5 h-5 cursor-pointer absolute right-5 text-gray-500 ${
        isDisabled ? 'opacity-50' : 'opacity-100'
      }`}
    />
  );
};

export default SendButton;