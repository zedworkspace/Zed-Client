import React from "react";
import BoardCard from "./boardCard";
import AddCard from "./addCard";
import { IList } from "@/interface/listInterface";
import { ICard } from "@/interface/cardInterface";
import { useDroppable } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card } from "../ui/card";
type Props = {
  list: IList;
  index: number;
};

export default function BoardList({ list, index }: Props) {
  const colors = [
    "border-l-red-400",
    "border-l-blue-400",
    "border-l-green-400",
    "border-l-yellow-400",
    "border-l-purple-400",
  ];

  const { setNodeRef } = useDroppable({ id: list._id });

  const items = list.cards.map((card) => ({ ...card, id: card._id }));

  return (
    <div className="w-72 p-3 h-full space-y-2 group" ref={setNodeRef}>
      <div
        className={`p-3 bg-primary/50 flex gap-2 items-center rounded-md border-l-4 ${
          colors[index % colors.length]
        } `}
      >
        <h1 className="line-clamp-1 font-bold">{list.name}</h1>
        <span className="bg-secondary px-2 py-1 border-none rounded-full text-xs font-semibold">
          {list.cards.length}
        </span>
      </div>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {list.cards.map((card: ICard) => (
          <BoardCard key={card._id} card={card} />
        ))}
      </SortableContext>
      <AddCard listId={list._id} boardId={list.boardId} />
    </div>
  );
}
