import { Input } from "@/components/ui/input";

interface MessageFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageField = ({ value, onChange }: MessageFieldProps) => {
  return (
    <Input
      type="text"
      className="flex-1 pl-24 border-none focus-visible:ring-0 rounded-md bg-primary outline-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-offset-0 h-12"
      placeholder="Type a message..."
      value={value}
      onChange={onChange}
    />
  );
};

export default MessageField;