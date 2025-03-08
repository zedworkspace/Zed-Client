interface MessageTimeProps {
    timestamp: string;
  }
  
  const MessageTime = ({ timestamp }: MessageTimeProps) => {
    const formattedTime = new Date(timestamp).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    
    return <p className="text-xs text-gray-300">{formattedTime}</p>;
  };
  
  export default MessageTime;