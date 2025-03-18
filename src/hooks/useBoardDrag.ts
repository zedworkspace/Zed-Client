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
  useUpdateCardPositionInDnd,
  useUpdateCardPositionWithInList,
} from "./useCard";

export const useBoardDrag = ({ channelId }: { channelId: string }) => {
  const [activeList, setActiveList] = useState<IList | null>(null);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
  const [dragData, setDragData] = useState<{
    start: IDragData | null;
    end: IDragData | null;
  }>({ start: null, end: null });

  const { onCardDrop, updatedListsHandler } = useBoardSocket();
  const { mutate: updateListPositions } = useUpdateListPosition();
  const { mutate: updateCardPositionWithInListMutate } =
    useUpdateCardPositionWithInList();
  const { mutate: updateCardPositionBetweenListMutate } =
    useUpdateCardPositionBetweenList();
  const { mutate: updateCardPositionInDndMutate } =
    useUpdateCardPositionInDnd();

  const queryClient = useQueryClient();

  const initializeSocketHandlers = () => {
    updatedListsHandler(queryClient, channelId);
  };

  const resetDragState = () => {
    setActiveCard(null);
    setActiveList(null);
    setDragData({ start: null, end: null });
  };

  const handleDragStart = (e: DragStartEvent) => {
    if (!e.active) return;

    const { type, list, card } = e.active.data.current as {
      type: "list" | "card";
      list?: IList;
      card?: ICard;
    };

    if (type === "list" && list) {
      setActiveList(list);
      setDragData({ start: { data: list, type: "list" }, end: null });
    } else if (type === "card" && card) {
      setActiveCard(card);
      setDragData({ start: { data: card, type: "card" }, end: null });
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    // console.log({ active, over });
    if (!active || !over || !active.data.current || !over.data.current) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeType = active.data.current?.type as "card" | "list";
    const overType = over.data.current?.type as "card" | "list";

    if (activeType === "card" && overType === "card") {
      setDragData((prev) => ({
        ...prev,
        end: { data: over.data.current?.card, type: "card" },
      }));
    } else if (activeType === "card" && overType === "list") {
      setDragData((prev) => ({
        ...prev,
        end: { data: over.data.current?.list, type: "list" },
      }));
    }

    // SCENARIO-3 : same lists card sorting
    if (activeType === "card") {
      const activeCard = active.data.current.card as ICard;
      const activeListId = activeCard.listId;

      if (overType === "card") {
        const overCard = over.data.current.card as ICard;
        const overListId = overCard.listId;
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
      } else if (overType === "list") {
        const overListId = overId;
        if (activeListId === overListId) return;

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
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    // console.log("handleDragEnd", { active, over });

    if (!active || !over) {
      resetDragState();
      return;
    }

    const { start, end } = dragData;
    console.log({ dragData });
    if (!start) {
      resetDragState();
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;
    // SCENARIO-1 : lists sorting
    if (
      active.data.current?.type === "list" &&
      over.data.current?.type === "list" &&
      activeId !== overId
    ) {
      // console.log("list sorting:OK");
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
    if (start?.type === "card" && end?.type === "list") {
      // console.log("implement the drag and drop:OK");
      const cardId = start.data._id as string;
      const fromListId = start.data.listId as string;
      const toListId = end.data._id as string;

      updateCardPositionInDndMutate({
        boardId: channelId,
        cardId,
        fromListId,
        toListId,
      });
    }

    // SCENARIO-3 : same lists card sorting
    if (
      start?.type === "card" &&
      end?.type === "card" &&
      start.data.listId === end.data.listId &&
      start.data._id !== end.data._id
    ) {
      // console.log("implement sorting with same list:OK");
      const listId = start.data.listId as string;
      const fromCardId = start.data._id as string;
      const toCardId = end.data._id as string;

      updateCardPositionWithInListMutate({ fromCardId, listId, toCardId });
    }

    // SCENARIO-4 : different lists card sorting
    if (
      start?.type === "card" &&
      end?.type == "card" &&
      start?.data.listId !== end?.data.listId &&
      start?.data._id !== end?.data._id
    ) {
      // console.log("different lists card sorting:Ok");

      const fromCardId = start.data._id as string;
      const toCardId = end.data._id as string;
      const fromListId = start.data.listId as string;
      const toListId = end.data.listId as string;
      updateCardPositionBetweenListMutate({
        fromCardId,
        fromListId,
        toCardId,
        toListId,
      });
    }
    resetDragState();
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
