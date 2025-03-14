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
  Over,
  Active,
  DragOverEvent,
  closestCorners,
} from "@dnd-kit/core";
import { useBoardSocket } from "@/context/boardSocketProvider";
import { useGetBoardById } from "@/hooks/useBoard";
import { useGetLists } from "@/hooks/useList";
import { useQueryClient } from "@tanstack/react-query";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { IGetLists, IList } from "@/interface/listInterface";

type Props = {
  boardId: string;
  projectId: string;
};

const mockData: IList[] = [
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
    name: "List 2",
  },
];

export default function Board({}: Props) {
  const [dummyData, setDummyData] = useState<IList[]>(mockData);

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

  const { onCardDrop, updatedListsHandler, socket } = useBoardSocket();

  useEffect(() => {
    updatedListsHandler(queryClient, channelId);
  }, []);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    console.log({ active, over });
    if (!active || !over) return;

    const cardId = active.id as string;
    const fromListId = active.data.current?.list as string;
    const toListId = over.id as string;

    console.log({ cardId, fromListId, toListId });

    if (!cardId || !toListId || !fromListId) return;

    // if (
    //   over.data.current?.isSorting &&
    //   active.id !== over.id &&
    //   active.data.current?.list === over.data.current?.list
    // ) {
    //   console.log("same list sortable");
    //   // setDummyData((items: IList[]) => {
    //   //   if (over.data.current !== undefined) {
    //   //     const list = items.find(
    //   //       (list) => list._id === over.data.current?.list
    //   //     );
    //   //     const oldIndex = list?.cards.findIndex(
    //   //       (item) => item._id === active.id
    //   //     ) as number;
    //   //     const newIndex = list?.cards.findIndex(
    //   //       (item) => item._id === over.id
    //   //     ) as number;
    //   //     console.log({ oldIndex, newIndex });
    //   //     const final = arrayMove(list?.cards!, oldIndex, newIndex);
    //   //     console.log("final", final);
    //   //     return items;
    //   //   } else {
    //   //     return items;
    //   //   }
    //   // });
    //   // here i will add sort functionality
    // } else if (
    //   active.data.current?.list !== over.data.current?.list &&
    //   over.data.current?.isSorting
    // ) {
    //   console.log("diffent lists but sortable");
    // } else {
    //   console.log("diffrent list");
    //   onCardDrop({ cardId, fromListId, toListId, boardId: channelId });
    // }

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

  // const handleDragOver = (e: DragOverEvent) => {
  //   const { active, over } = e;
  //   console.log({ active, over });

  //   if (!active || !over) return;

  //   const activeCardId = active.id as string;
  //   const overCardId = over.id as string;
  //   const fromListId = active.data.current?.list as string;
  //   const toListId = over.data.current?.list as string;

  //   console.log({ activeCardId, overCardId, fromListId, toListId });
  //   if (!activeCardId || !fromListId || !toListId || fromListId === toListId)
  //     return;

  //   // setDummyData((prevData) => {
  //   //   // Find the source and destination lists
  //   //   const activeList = prevData.find((list) => list._id === fromListId);
  //   //   const overList = prevData.find((list) => list._id === toListId);

  //   //   if (!activeList || !overList) return prevData;

  //   //   // Find the card being moved
  //   //   const activeCard = activeList.cards.find((card) => card._id === activeCardId);
  //   //   if (!activeCard) return prevData;

  //   //   return prevData.map((list) => {
  //   //     if (list._id === fromListId) {
  //   //       // Remove the card from the source list
  //   //       return {
  //   //         ...list,
  //   //         cards: list.cards.filter((card) => card._id !== activeCardId),
  //   //       };
  //   //     } else if (list._id === toListId) {
  //   //       // Add the card to the destination list
  //   //       return {
  //   //         ...list,
  //   //         cards: [...list.cards, activeCard],
  //   //       };
  //   //     }
  //   //     return list;
  //   //   });
  //   // });
  // };

  const items = dummyData.map((item) => ({ ...item, id: item._id }));
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
          // onDragOver={handleDragOver}
          collisionDetection={closestCorners}
        >
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            {/* <BoardContents lists={dummyData} boardId={channelId} /> */}
            <BoardContents lists={boardLists?.data} boardId={channelId} />
          </SortableContext>
        </DndContext>
      </div>
    );
}
