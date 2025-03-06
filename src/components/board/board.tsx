import React, { useEffect } from "react";
import BoardHeader from "./boardHeader";
import BoardContents from "./boardContents";
import { useParams } from "next/navigation";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { IList } from "@/interface/listInterface";

type Props = {
  boardId: string;
  projectId: string;
};

export default function Board({}: Props) {
  const { channelId, projectId } = useParams() as {
    channelId: string;
    projectId: string;
  };

  const {
    data: BoardData,
    isSuccess: boardSuccess,
    isLoading: boardLoading,
  } = useGetBoardById({
    boardId: channelId,
    projectId,
  });

  const {
    data: boardLists,
    isSuccess: listSuccess,
    isLoading: listLoading,
  } = useGetLists({
    boardId: channelId,
  });

  const queryClient = useQueryClient();

  const { onCardDrop, updatedListsHandler } = useBoardSocket();

  useEffect(() => {
    updatedListsHandler(queryClient, channelId);
  }, []);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!active || !over) return;

    const sourceList = active.id; //card id
    const targerList = over.id; // list id

    if (!sourceList || !targerList || sourceList === targerList) return;

    // const list = lists?.find((list) => list._id === active.data.current?.list);
    // console.log("activeList", list);
    // const card = list?.cards.find((card) => card._id === active.id);
    // console.log("activeCard", card);
    // const result = lists?.map((list) =>
    //   over.id === list._id ? list?.cards.push(card!) : list
    // );
    // console.log("result", result);
    // const final = lists?.map((list) =>
    //   list._id === active.data.current?.list
    //     ? list.cards.map((card) => card._id !== active.id)
    //     : list
    // );
    // console.log("final ", final);
  };

  return (
    <div className="h-full flex flex-col">
      <BoardHeader board={board} />
      <DndContext onDragEnd={handleDragEnd}>
        <BoardContents lists={lists} boardId={channelId} />
      </DndContext>
    </div>
  );
}
