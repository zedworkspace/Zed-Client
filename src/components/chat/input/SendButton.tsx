import { SendHorizonalIcon } from "lucide-react";

interface SendButtonProps {
  onClick: () => void;
  isPending: boolean;
}

const SendButton = ({ onClick, isPending }: SendButtonProps) => {
  return (
    <div className="w-5 h-5 cursor-pointer absolute right-5 text-gray-500">
      {isPending ? <SendHorizonalIcon/> : <SendHorizonalIcon onClick={onClick} />}
    </div>
  );
};

export default SendButton;
