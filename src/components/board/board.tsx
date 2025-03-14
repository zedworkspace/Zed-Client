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

  const handleDragEnd = (e: DragEndEvent) => {
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

  console.log("activeList", activeList);
  const handleDragStart = (e: DragStartEvent) => {
    console.log("ON DRAG START:", e);
    if (e.active.data.current?.type === "list") {
      setActiveList(e.active.data.current.list);
      return;
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
        >
          {/* <BoardContents lists={dummyData} boardId={channelId} /> */}
          <SortableContext items={items!}>
            <BoardContents lists={boardLists?.data} boardId={channelId} />
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeList && <BoardList list={activeList} index={0} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    );
}
