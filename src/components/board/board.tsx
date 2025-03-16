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
import {
  useUpdateCardPositionBetweenList,
  useUpdateCardPositionWithInList,
} from "@/hooks/useCard";
type Props = {
  boardId: string;
  projectId: string;
};

interface DragCard {
  data: ICard;
  type: "card";
}

interface DragList {
  data: IList;
  type: "list";
}

type DragData = DragCard | DragList;
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
  const { mutate: updateCardPositionWithInListMutate } =
    useUpdateCardPositionWithInList();
  const { mutate: updateCardPositionBetweenListMutate } =
    useUpdateCardPositionBetweenList();

  const queryClient = useQueryClient();

  const { onCardDrop, updatedListsHandler, socket } = useBoardSocket();

  useEffect(() => {
    updatedListsHandler(queryClient, channelId);
  }, []);

  const [activeList, setActiveList] = useState<IList | null>(null);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);

  const [dragStartData, setDragStartData] = useState<DragData | null>(null);
  const [dragEndData, setDragEndData] = useState<DragData | null>(null);

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveCard(null);
    setActiveList(null);
    const { active, over } = e;
    // console.log({ active, over });
    // console.log("in drag End>>>", { dragStartData, dragEndData });
    if (!active || !over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    // SCENARIO-1 : lists sorting
    if (
      active.data.current?.type === "list" &&
      over.data.current?.type === "list" &&
      activeId !== overId
    ) {
      console.log("list sorting:OK");
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

    // SCENARIO-2 : different lists card dnd
    if (
      active.data.current?.type === "card" &&
      over.data.current?.type === "list"
    ) {
      console.log("implement the drag and drop:OK");
      const cardId = activeId;
      const fromListId = active.data.current?.card.listId;
      const toListId = overId;

      onCardDrop({ cardId, fromListId, toListId, boardId: channelId });
    }
    // SCENARIO-2 : different lists card dnd
    if (
      active.data.current?.type === "card" &&
      over.data.current?.type === "card" &&
      dragStartData?.type === "card" &&
      dragEndData?.type === "list"
    ) {
      console.log("implement the drag and drop exception case:OK");
      console.log({ active, over });
      const cardId = dragStartData.data._id;
      const fromListId = dragStartData.data.listId;
      const toListId = dragEndData.data._id;

      onCardDrop({ cardId, fromListId, toListId, boardId: channelId });
    }

    // SCENARIO-3 : same lists card sorting
    if (
      dragStartData?.type === "card" &&
      dragEndData?.type === "card" &&
      dragStartData.data.listId === dragEndData.data.listId &&
      dragStartData.data._id !== dragEndData.data._id
    ) {
      console.log("implement sorting with same list:OK");
      console.log("in drag End>>>", { dragStartData, dragEndData });
      const listId = dragStartData.data.listId as string;
      const fromCardId = dragStartData.data._id as string;
      const toCardId = dragEndData.data._id as string;
      console.log({ listId, fromCardId, toCardId });
      updateCardPositionWithInListMutate({ fromCardId, listId, toCardId });
    }

    // SCENARIO-4 : different lists card sorting
    if (
      dragStartData?.type === "card" &&
      dragEndData?.type == "card" &&
      dragStartData?.data.listId !== dragEndData?.data.listId &&
      dragStartData?.data._id !== dragEndData?.data._id
    ) {
      console.log("implement sorting with differenct list");
      const fromCardId = dragStartData.data._id;
      const toCardId = dragEndData.data._id;
      const fromListId = dragStartData.data.listId;
      const toListId = dragEndData.data.listId;
      updateCardPositionBetweenListMutate({
        fromCardId,
        fromListId,
        toCardId,
        toListId,
      });
    }

    // if (
    //   active.data.current?.type === "card" &&
    //   over.data.current?.type === "card" &&
    //   active.data.current?.card.listId !== over.data.current?.card.listId
    // ) {
    //   console.log("implement sorting with differenct list");
    // }

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
    // console.log("ON DRAG START:", e);
    if (!e.active) return;

    if (e.active.data.current?.type === "list") {
      setActiveList(e.active.data.current.list);
      // setDragStartData(e.active.data.current.list);
      return;
    } else if (e.active.data.current?.type === "card") {
      setActiveCard(e.active.data.current.card);
      // setDragStartData(e.active.data.current.card);
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

    if (activeId !== overId && isActiveCard && isOverCard) {
      console.log("inside fda", { active, over });
      setDragStartData({ data: active.data.current?.card, type: "card" });
      setDragEndData({ data: over.data.current?.card, type: "card" });
    } else if (isActiveCard && isOverList) {
      console.log("inside card and list dnd");
      setDragStartData({ data: active.data.current?.card, type: "card" });
      setDragEndData({ data: over.data.current?.list, type: "list" });
    }

    // SCENARIO-3 : same lists card sorting
    if (isActiveCard && isOverCard) {
      // setDragEndData(over.data.current?.card);
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
      // setDragEndData(over.data.current?.list);
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
