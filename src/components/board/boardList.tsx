import React from "react";
import BoardCard from "./boardCard";
import CreateTask from "./createTask";

export default function BoardList({
  list,
  index,
}: {
  list: any;
  index: number;
}) {
  const colors = [
    "border-l-red-400",
    "border-l-blue-400",
    "border-l-green-400",
    "border-l-yellow-400",
    "border-l-purple-400",
  ];
  
  return (
    <div className="w-72 p-3 h-min space-y-2">
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
      {list.cards.map((card: any) => (
        <BoardCard key={card.id} card={card} />
      ))}
      <CreateTask />
    </div>
  );
}
