import React, { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import BoardHeader from "./boardHeader";
import BoardContents from "./boardContents";
import DragOverlayWrapper from "./dragOverlayWrapper";

import { useGetBoardById } from "@/hooks/useBoard";
import { useGetLists } from "@/hooks/useList";
import { useBoardDrag } from "@/hooks/useBoardDrag";

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

  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    activeCard,
    activeList,
    initializeSocketHandlers,
  } = useBoardDrag({
    channelId,
  });

  useEffect(() => {
    initializeSocketHandlers();
  }, []);

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
          <DragOverlayWrapper activeCard={activeCard} activeList={activeList} />
        </DndContext>
      </div>
    );
}
