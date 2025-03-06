/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  use,
  SetStateAction,
} from "react";
import { connectSocket, getSocket } from "../utils/socket";
import { Socket } from "socket.io-client";
import { IList } from "@/interface/listInterface";

interface OnCardDrop {
  fromListId: string;
  cardId: string;
  toListId: string;
  boardId: string;
}

interface SocketContextProps {
  socket: Socket | null;
  onCardDrop: ({ fromListId, cardId, toListId }: OnCardDrop) => void;
  updatedBoard: (
    setData: React.Dispatch<React.SetStateAction<IList[]>>
  ) => void;
  // updatedBoard: () => IList[];
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const BoardSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState(getSocket());
  const [updatedLists, setUpdatedLists] = useState<IList[]>([]);

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

  const updatedBoard = (
    setData: React.Dispatch<React.SetStateAction<IList[]>>
  ) => {
    socket?.on("updatedBoard", (data) => {
      // setUpdatedLists(data);
      setData(data);
    });
    // return updatedLists;
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        onCardDrop,
        updatedBoard,
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
