import React, { useEffect, useState } from "react";
import BoardHeader from "./boardHeader";
import BoardContents from "./boardContents";
import { useParams } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
} from "@dnd-kit/core";
import { useBoardSocket } from "@/context/boardSocketProvider";
import { useGetBoardById } from "@/hooks/useBoard";
import { useGetLists } from "@/hooks/useList";
import { useQueryClient } from "@tanstack/react-query";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { IGetLists, IList } from "@/interface/listInterface";
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

  const dummyData: IList[] = [
    {
      _id: "list_1",
      boardId: "1",
      cards: [
        {
          _id: "card_1",
          assignees: [{ _id: "user_1", profileImg: "sample", name: "sample" }],
          description: "fasd",
          dueDate: "fasd",
          labels: ["fD"],
          listId: "list_1",
          title: "Card 1",
        },
        {
          _id: "card_2",
          assignees: [{ _id: "user_1", profileImg: "sample", name: "sample" }],
          description: "fasd",
          dueDate: "fasd",
          labels: ["fD"],
          listId: "list_1",
          title: "Card 2",
        },
      ],
      name: "List 1",
    },
    {
      _id: "list_2",
      boardId: "1",
      cards: [
        {
          _id: "card_3",
          assignees: [{ _id: "user_1", profileImg: "sample", name: "sample" }],
          description: "fasd",
          dueDate: "fasd",
          labels: ["fD"],
          listId: "list_2",
          title: "Card 3",
        },
      ],
      name: "List 1",
    },
  ];
  const queryClient = useQueryClient();

  const { onCardDrop, updatedListsHandler, socket } = useBoardSocket();

  useEffect(() => {
    updatedListsHandler(queryClient, channelId);
  }, []);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    // console.log({ active, over });
    if (!active || !over) return;

    const cardId = active.id as string;
    const fromListId = active.data.current?.list as string;
    const toListId = over.id as string;

    // console.log({ cardId, fromListId, toListId });
    if (!cardId || !toListId || !fromListId) return;

    if (fromListId === toListId) {
      console.log("same list");
    } else {
      console.log("not same list");
      onCardDrop({ cardId, fromListId, toListId, boardId: channelId });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const isLoading = boardLoading || listLoading;
  const isSuccess = boardSuccess || listSuccess;

  if (isLoading) return <div>Loading...</div>;

  if (isSuccess)
    return (
      <div className="h-full flex flex-col">
        <BoardHeader board={BoardData?.data} />
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {/* <BoardContents lists={dummyData} boardId={channelId} /> */}
          <BoardContents lists={boardLists?.data} boardId={channelId} />
        </DndContext>
      </div>
    );
}
