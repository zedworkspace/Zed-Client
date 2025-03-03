import React from "react";
import BoardList from "./boardList";
import CreateTask from "./createTask";
import AddList from "./addList";

export default function BoardContents({
  lists,
  boardId,
}: {
  lists: any;
  boardId: string;
}) {
  return (
    <div className="flex-1 w-full  overflow-auto scrollbar-hide h-full ">
      <div className="min-w-max flex">
        {lists.map((list: any, index: number) => (
          <BoardList list={list} index={index} />
        ))}
        <AddList boardId={boardId} />
      </div>
    </div>
  );
}
