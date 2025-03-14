'use client'
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

interface MessageFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const MessageField = ({ value, onChange, onKeyDown }: MessageFieldProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; 

  return (
    <div className=" w-full">
      <Input
      type="text"
      className="flex-1 pl-24 border-none focus-visible:ring-0 rounded-md bg-primary outline-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-offset-0 h-12"
      placeholder="Type a message..."
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
    </div>
  );
};

export default MessageField;