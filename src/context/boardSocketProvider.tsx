"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { connectSocket, getSocket } from "../utils/socket";
import { Socket } from "socket.io-client";
import { IGetLists } from "@/interface/listInterface";
import { QueryClient } from "@tanstack/react-query";

interface OnCardDrop {
  fromListId: string;
  cardId: string;
  toListId: string;
  boardId: string;
}

interface SocketContextProps {
  socket: Socket | null;
  onCardDrop: ({ fromListId, cardId, toListId }: OnCardDrop) => void;
  updatedListsHandler: (queryClient: QueryClient, boardId: string) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const BoardSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState(getSocket());

  useEffect(() => {
    if (!socket) {
      const newSocket = connectSocket();
      setSocket(newSocket);
    }
  }, []);

  const onCardDrop = ({
    fromListId,
    cardId,
    toListId,
    boardId,
  }: OnCardDrop) => {
    socket?.emit("onCardDrop", fromListId, cardId, toListId, boardId);
  };

  const updatedListsHandler = (queryClient: QueryClient, boardId: string) => {
    socket?.on("onUpdateList", (updatedData) => {
      queryClient.setQueryData(["lists", boardId], (oldData: IGetLists) => {
        return { ...oldData, data: updatedData };
      });
    });
  };

  // const updateCardPositionWithInList = (data:)=>{
  //   socket?.emit("onUpdateCardPositionWithInList",data)
  // }

  return (
    <SocketContext.Provider
      value={{
        socket,
        onCardDrop,
        updatedListsHandler,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useBoardSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
