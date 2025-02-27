/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { connectSocket, getSocket } from "../utils/socket";
import { Socket } from "socket.io-client";

interface SocketContextProps {
  socket:Socket |null ;
  joinRoom: (channelId: string) => void;
  sendMessage: (message: MessagePayload) => void;
}

interface Sender {
  _id: string;
  name: string;
  profileImg: string;
}

interface MessagePayload {
  channelId: string;
  senderId: Sender;
  content: string;
  type: string;
}
const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState(getSocket());

  useEffect(() => {
    if (!socket) {
      const newSocket = connectSocket();
      setSocket(newSocket);
    }
  }, []);

  const joinRoom = (channelId: string) => {
    socket?.emit("joinRoom", channelId);
  };


  const sendMessage = (message: MessagePayload) => {
    const messageData = {
      ...message,
      sender: {
        _id: message.senderId._id,
        name: message.senderId.name,
        profileImg: message.senderId.profileImg 
      },
    };

    console.log("Sending message:", messageData);
    socket?.emit("sendMessage", messageData);
  };
  

  return (
    <SocketContext.Provider value={{ socket, joinRoom, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
