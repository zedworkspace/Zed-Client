import { useBoardSocket } from "@/context/boardSocketProvider";
import { IDragData } from "@/interface/boardInterface";
import { ICard } from "@/interface/cardInterface";
import { IGetLists, IList } from "@/interface/listInterface";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useUpdateListPosition } from "./useList";
import {
  useUpdateCardPositionBetweenList,
  useUpdateCardPositionWithInList,
} from "./useCard";

export const useBoardDrag = ({ channelId }: { channelId: string }) => {
  const [activeList, setActiveList] = useState<IList | null>(null);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
  const [dragStartData, setDragStartData] = useState<IDragData | null>(null);
  const [dragEndData, setDragEndData] = useState<IDragData | null>(null);

  const { onCardDrop, updatedListsHandler } = useBoardSocket();
  const { mutate: updateListPositions } = useUpdateListPosition();
  const { mutate: updateCardPositionWithInListMutate } =
    useUpdateCardPositionWithInList();
  const { mutate: updateCardPositionBetweenListMutate } =
    useUpdateCardPositionBetweenList();

  const queryClient = useQueryClient();

  const initializeSocketHandlers = () => {
    updatedListsHandler(queryClient, channelId);
  };
  const handleDragStart = (e: DragStartEvent) => {
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

    if (!active || !over) return;

    const activeId = active.id;
    const overId = over.id;

    const isActiveCard = active.data.current?.type === "card";
    const isOverCard = over.data.current?.type === "card";
    const isOverList = over.data.current?.type === "list";

    if (activeId !== overId && isActiveCard && isOverCard) {
      setDragStartData({ data: active.data.current?.card, type: "card" });
      setDragEndData({ data: over.data.current?.card, type: "card" });
    } else if (isActiveCard && isOverList) {
      setDragStartData({ data: active.data.current?.card, type: "card" });
      setDragEndData({ data: over.data.current?.list, type: "list" });
    }

    // SCENARIO-3 : same lists card sorting
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

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveCard(null);
    setActiveList(null);
    const { active, over } = e;

    if (!active || !over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    // SCENARIO-1 : lists sorting
    if (
      active.data.current?.type === "list" &&
      over.data.current?.type === "list" &&
      activeId !== overId
    ) {
      //   console.log("list sorting:OK");
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
      // console.log("implement the drag and drop:OK");
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
      // console.log("implement the drag and drop exception case:OK");
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
      // console.log("implement sorting with same list:OK");
      const listId = dragStartData.data.listId as string;
      const fromCardId = dragStartData.data._id as string;
      const toCardId = dragEndData.data._id as string;

      updateCardPositionWithInListMutate({ fromCardId, listId, toCardId });
    }

    // SCENARIO-4 : different lists card sorting
    if (
      dragStartData?.type === "card" &&
      dragEndData?.type == "card" &&
      dragStartData?.data.listId !== dragEndData?.data.listId &&
      dragStartData?.data._id !== dragEndData?.data._id
    ) {
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
  };
  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    activeList,
    activeCard,
    initializeSocketHandlers,
  };
};
