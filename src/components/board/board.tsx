import React, { useEffect, useMemo, useState } from "react";
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
  DragStartEvent,
  DragOverlay,
  DragOverEvent,
} from "@dnd-kit/core";
import { useBoardSocket } from "@/context/boardSocketProvider";
import { useGetBoardById } from "@/hooks/useBoard";
import { useGetLists, useUpdateListPosition } from "@/hooks/useList";
import { useQueryClient } from "@tanstack/react-query";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { IGetLists, IList } from "@/interface/listInterface";
import BoardList from "./boardList";
import { createPortal } from "react-dom";
import { ICard } from "@/interface/cardInterface";
import BoardCard from "./boardCard";
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

  const { mutate: updateListPositions } = useUpdateListPosition();

  const dummyData: IList[] = [
    {
      _id: "list1",
      name: "To Do",
      boardId: "board1",
      cards: [
        {
          _id: "card1",
          listId: "list1",
          title: "Set up project",
          description: "Initialize the project with necessary dependencies.",
          labels: ["Setup", "High Priority"],
          dueDate: "2025-04-01T10:00:00Z",
          assignees: [
            {
              _id: "user1",
              name: "John Doe",
              email: "john@example.com",
              profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
            },
          ],
        },
      ],
    },
    {
      _id: "list2",
      name: "In Progress",
      boardId: "board1",
      cards: [
        {
          _id: "card2",
          listId: "list2",
          title: "Develop authentication",
          description:
            "Implement login and registration with JWT authentication.",
          labels: ["Backend", "Security"],
          dueDate: "2025-04-05T15:00:00Z",
          assignees: [
            {
              _id: "user2",
              name: "Jane Smith",
              email: "jane@example.com",
              profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
            },
          ],
        },
      ],
    },
  ];
  const queryClient = useQueryClient();

  const { onCardDrop, updatedListsHandler, socket } = useBoardSocket();

  useEffect(() => {
    updatedListsHandler(queryClient, channelId);
  }, []);

  const [activeList, setActiveList] = useState<IList | null>(null);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveCard(null);
    setActiveList(null);
    const { active, over } = e;
    console.log({ active, over });
    if (!active || !over) return;

    if (
      active.data.current?.type === "list" &&
      over.data.current?.type === "list" &&
      active.id !== over.id
    ) {
      const activeListId = active.id as string;
      const overListId = over.id as string;
      queryClient.setQueryData(["lists", channelId], (oldData: IGetLists) => {
        const activeListIndex = oldData.data.findIndex(
          (list) => list._id === activeListId
        );
        const overListIndex = oldData.data.findIndex(
          (list) => list._id === overListId
        );
        const data = arrayMove(oldData.data, activeListIndex, overListIndex);
        return { ...oldData, data };
      });
      updateListPositions({ activeListId, overListId, boardId: channelId });
    }
    // const cardId = active.id as string;
    // const fromListId = active.data.current?.list as string;
    // const toListId = over.id as string;

    // console.log({ cardId, fromListId, toListId });
    // if (!cardId || !toListId || !fromListId) return;

    // if (fromListId === toListId) {
    //   console.log("same list");
    // } else {
    //   console.log("not same list");
    //   onCardDrop({ cardId, fromListId, toListId, boardId: channelId });
    // }
  };

  const handleDragStart = (e: DragStartEvent) => {
    console.log("ON DRAG START:", e);
    if (!e.active) return;

    if (e.active.data.current?.type === "list") {
      setActiveList(e.active.data.current.list);
      return;
    } else if (e.active.data.current?.type === "card") {
      setActiveCard(e.active.data.current.card);
      return;
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    console.log("ON DRAG OVER:", { active, over });
    if (!active || !over) return;

    const activeId = active.id;
    const overId = over.id;

    const isActiveCard = active.data.current?.type === "card";
    const isOverCard = over.data.current?.type === "card";
    const isOverList = over.data.current?.type === "list";

    if (isActiveCard && isOverCard) {
      const activeListId = active.data.current?.card.listId;
      const overListId = over.data.current?.card.listId;
      if (!activeListId || !overListId) return;

      queryClient.setQueryData(["lists", channelId], (oldData: IGetLists) => {
        const newData: IGetLists = {
          ...oldData,
          data: JSON.parse(JSON.stringify(oldData.data)),
        };

        const activeList = newData.data.find(
          (list) => list._id === activeListId
        );
        const overList = newData.data.find((list) => list._id === overListId);

        if (!activeList || !overList) return oldData;

        const activeCardIndex = activeList?.cards.findIndex(
          (card) => card._id === activeId
        );
        const overCardIndex = overList?.cards.findIndex(
          (card) => card._id === overId
        );

        if (activeCardIndex < 0 && overCardIndex < 0) return oldData;

        const [movedCard] = activeList.cards.splice(activeCardIndex, 1);

        movedCard.listId = overListId;

        overList.cards.splice(overCardIndex, 0, movedCard);

        return newData;
      });
    }

    if (isActiveCard && isOverList) {
      const activeListId = active.data.current?.card.listId;
      const overListId = overId;
      if (!activeListId || !overListId) return;
      queryClient.setQueryData(["lists", channelId], (oldData: IGetLists) => {
        const newData: IGetLists = {
          ...oldData,
          data: JSON.parse(JSON.stringify(oldData.data)),
        };
        const activeList = newData.data.find(
          (list) => list._id === activeListId
        );
        const overList = newData.data.find((list) => list._id === overListId);

        if (!activeList || !overList) return oldData;

        const activeCardIndex = activeList?.cards.findIndex(
          (card) => card._id === activeId
        );

        if (activeCardIndex < 0) return oldData;

        const [movedCard] = activeList.cards.splice(activeCardIndex, 1);

        movedCard.listId = overListId as string;
        overList.cards.push(movedCard);
        return newData;
      });
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

  const items = useMemo(
    () => boardLists?.data.map((list) => list._id),
    [boardLists?.data]
  );

  // console.log("items", items);
  const isLoading = boardLoading || listLoading;
  const isSuccess = boardSuccess || listSuccess;

  if (isLoading) return <div>Loading...</div>;

  if (isSuccess)
    return (
      <div className="h-full flex flex-col">
        <BoardHeader board={BoardData?.data} />
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
        >
          {/* <BoardContents lists={dummyData} boardId={channelId} /> */}
          <SortableContext items={items!}>
            <BoardContents lists={boardLists?.data} boardId={channelId} />
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeList && <BoardList list={activeList} index={0} />}
              {activeCard && <BoardCard card={activeCard} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    );
}
