import { IBoard } from "@/interface/boardInterface";
import React, { useContext, useEffect, useState } from "react";
import BoardHeader from "./boardHeader";
import BoardContents from "./boardContents";
import { useParams } from "next/navigation";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { IList } from "@/interface/listInterface";
import { useBoardSocket } from "@/context/boardSocketProvider";

type Props = {
  board?: IBoard;
  lists: IList[];
};

export default function Board({ lists, board }: Props) {
  const { channelId, projectId } = useParams() as {
    channelId: string;
    projectId: string;
  };

  const { onCardDrop, updatedBoard } = useBoardSocket();

  const [data, setData] = useState<IList[]>(lists);

  useEffect(() => {
    updatedBoard(setData);
  }, []);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!active || !over) return;

    const sourceList = active.id; //card id
    const targerList = over.id; // list id

    if (!sourceList || !targerList || sourceList === targerList) return;

    const cardId = active.id as string;
    const fromListId = active.data.current?.list as string;
    const toListId = over.id as string;

    onCardDrop({ cardId, fromListId, toListId, boardId: channelId });
  };

  return (
    <div className="h-full flex flex-col">
      <BoardHeader board={board} />
      <DndContext onDragEnd={handleDragEnd}>
        <BoardContents lists={data} boardId={channelId} />
      </DndContext>
    </div>
  );
}
