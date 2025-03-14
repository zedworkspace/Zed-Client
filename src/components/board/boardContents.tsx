import React from "react";
import BoardList from "./boardList";
import AddList from "./addList";
import { IList } from "@/interface/listInterface";
import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type Props = {
  lists?: IList[];
  boardId: string;
};

export default function BoardContents({ lists, boardId }: Props) {
  const items = lists?.map((item) => ({ ...item, id: item._id }));
  return (
    <div className="flex-1 w-full  overflow-auto scrollbar-hide h-full">
      <div className="min-w-max flex h-full">
        {/* {items && (
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          > */}
            {lists?.map((list: IList, index: number) => (
              <BoardList list={list} index={index} key={list._id} />
            ))}
          {/* </SortableContext>
        )} */}
        <AddList boardId={boardId} />
      </div>
    </div>
  );
}
