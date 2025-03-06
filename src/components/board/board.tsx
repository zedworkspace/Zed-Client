import { IBoard } from "@/interface/boardInterface";
import React, { useState } from "react";
import BoardHeader from "./boardHeader";
import BoardContents from "./boardContents";
import { useParams } from "next/navigation";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { IList } from "@/interface/listInterface";

type Props = {
  board?: IBoard;
  lists?: IList[];
};

export default function Board({ lists, board }: Props) {
  const { channelId, projectId } = useParams() as {
    channelId: string;
    projectId: string;
  };

  // const [data, setData] = useState<IList[]>([
  //   {
  //     _id: "list_1",
  //     boardId: "1",
  //     name: "list 1",
  //     cards: [
  //       {
  //         _id: "card_1",
  //         title: "card 1",
  //         listId: "list_1",
  //         assignees: [],
  //         description: "",
  //         dueDate: "fasf",
  //         labels: [],
  //       },
  //       // {
  //       //   _id: "2",
  //       //   title: "card 3",
  //       //   listId: "1",
  //       //   assignees: [],
  //       //   description: "",
  //       //   dueDate: "fasf",
  //       //   labels: [],
  //       // },
  //     ],
  //   },
  //   {
  //     _id: "list_2",
  //     boardId: "1",
  //     name: "list 2",
  //     cards: [
  //       {
  //         _id: "card_3",
  //         title: "card 2",
  //         listId: "list_2",
  //         assignees: [],
  //         description: "",
  //         dueDate: "fasf",
  //         labels: [],
  //       },
  //     ],
  //   },
  // ]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    console.log("active", active);
    console.log("over", over);
    if (!active || !over) return;
    const sourceList = active.id; //card id
    const targerList = over.id; // list id

    if (!sourceList || !targerList || sourceList === targerList) return;

    // const list = lists?.find((list) => list._id === active.data.current?.list);
    // console.log("activeList", list);
    // const card = list?.cards.find((card) => card._id === active.id);
    // console.log("activeCard", card);
    // const result = lists?.map((list) =>
    //   over.id === list._id ? list?.cards.push(card!) : list
    // );
    // console.log("result", result);
    // const final = lists?.map((list) =>
    //   list._id === active.data.current?.list
    //     ? list.cards.map((card) => card._id !== active.id)
    //     : list
    // );
    // console.log("final ", final);
  };

  return (
    <div className="h-full flex flex-col">
      <BoardHeader board={board} />
      <DndContext onDragEnd={handleDragEnd}>
        <BoardContents lists={lists} boardId={channelId} />
      </DndContext>
    </div>
  );
}
