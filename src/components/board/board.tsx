import { IBoard } from "@/interface/boardInterface";
import React from "react";
import BoardHeader from "./boardHeader";
import BoardContents from "./boardContents";
import { useParams } from "next/navigation";

import { IList } from "@/interface/listInterface";
import { CardModal } from "./cardModal";

type Props = {
  board?: IBoard;
  lists?: IList[];
};

export default function Board({ lists, board }: Props) {
  const { channelId, projectId } = useParams() as {
    channelId: string;
    projectId: string;
  };

  return (
    <div className="h-full flex flex-col">
      
      <BoardHeader board={board} />
      <BoardContents lists={lists} boardId={channelId} />
    </div>
  );
}
