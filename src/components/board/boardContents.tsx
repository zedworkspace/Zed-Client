import React from "react";
import BoardList from "./boardList";
import AddList from "./addList";
import { IList } from "@/interface/listInterface";

type Props = {
  lists?: IList[];
  boardId: string;
};

export default function BoardContents({ lists, boardId }: Props) {
  return (
    <div className="flex-1 w-full  overflow-auto scrollbar-hide h-full">
      <div className="min-w-max flex h-full">
        {lists?.map((list: IList) => (
          <BoardList boardId={boardId} list={list} key={list._id} />
        ))}
        <AddList boardId={boardId} />
      </div>
    </div>
  );
}
