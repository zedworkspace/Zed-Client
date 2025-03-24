import React, { useMemo, useState } from "react";
import BoardCard from "./boardCard";
import AddCard from "./addCard";
import { IList } from "@/interface/listInterface";
import { ICard } from "@/interface/cardInterface";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card } from "../ui/card";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useDeleteListById } from "@/hooks/useList";

type Props = {
  list: IList;
  boardId?: string;
};

export default function BoardList({ list, boardId }: Props) {
  const listDeleteMutate = useDeleteListById(boardId!);
  
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list._id, data: { type: "list", list } });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  const items = useMemo(() => list.cards.map((card) => card._id!), [list]);

  const handleDeleteList = () => {
    listDeleteMutate.mutate(list._id);
  };
  if (isDragging)
    return (
      <div
        className="w-72 p-3 h-full space-y-2 opacity-30"
        ref={setNodeRef}
        style={style}
      >
        <div
          className={`p-3 bg-primary/50 flex gap-2 items-center rounded-md border-l-4 border-l-${list.color}-400`}
        >
          <h1 className="line-clamp-1 font-bold">{list.name}</h1>
          <span className="bg-secondary px-2 py-1 border-none rounded-full text-xs font-semibold">
            {list.cards.length}
          </span>
        </div>

        {list.cards.map((card: ICard) => (
          <BoardCard key={card._id} card={card} />
        ))}

        <AddCard listId={list._id} boardId={list.boardId} />
      </div>
    );
  return (
    <div
      className="w-72 p-3 h-full space-y-2 group "
      ref={setNodeRef}
      style={style}
    >
      <div
        className={`p-3 bg-black/30 shadow-md shadow-black/50 flex justify-between items-center rounded-md border-l-4 border-l-${list.color}-400`}
        {...attributes}
        {...listeners}
      >
        <div className="flex gap-2 items-center">
          <h1 className="line-clamp-1 font-bold">{list.name}</h1>
          <span className="bg-secondary px-2 py-1 border-none rounded-full text-xs font-semibold">
            {list.cards.length}
          </span>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <EllipsisVertical className="w-5 h-5 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-28 p-0 rounded-none bg-background border-none text-white ">
              <Button
                variant="ghost"
                className="text-left p-0 font-semibold hover:bg-secondary  hover:text-white rounded-none"
              >
                Edit
              </Button>
              <Separator className="bg-secondary" />
              <Button
                variant="ghost"
                className="text-left text-red-500 hover:text-red-500  p-0 font-semibold hover:bg-secondary rounded-none"
                onClick={handleDeleteList}
              >
                Delete
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <SortableContext items={items}>
        {list.cards.map((card: ICard) => (
          <BoardCard key={card._id} card={card} />
        ))}
      </SortableContext>

      <AddCard listId={list._id} boardId={list.boardId} />
    </div>
  );
}
