"use client";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { ICard } from "@/interface/cardInterface";
import { IUser } from "@/interface/userInterface";
import { useDraggable } from "@dnd-kit/core";
import { useCardStore } from "@/store/cardStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export default function BoardCard({ card }: { card: ICard }) {
  const colors = [
    "bg-red-400 text-red-900 hover:bg-red-500",
    "bg-blue-400 text-blue-900 hover:bg-blue-500",
    "bg-green-400 text-green-900 hover:bg-green-500",
    "bg-yellow-400 text-yellow-900 hover:bg-yellow-500",
    "bg-purple-400 text-purple-900 hover:bg-purple-500",
  ];

  const { setCardid, onOpen } = useCardStore();
  const [isLabelHide, setIsLabelHide] = useState(true);

  // const { setNodeRef, transform, listeners, attributes, isDragging } =
  //   useDraggable({
  //     id: card._id,
  //     data: { list: card.listId },
  //   });
  const {
    setNodeRef,
    transform,
    transition,
    listeners,
    attributes,
    isDragging,
    isSorting,
  } = useSortable({
    id: card._id,
    data: { list: card.listId, isSorting: true },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x || 0}px, ${
          transform.y || 0
        }px,0)`,
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
        zIndex: 50,
        opacity: 0.8,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
      }
    : {
        transform: undefined,
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
      };

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  //   // border: "1px solid #ddd",
  //   // padding: "10px",
  //   // margin: "5px 0",
  //   // backgroundColor: "white",
  //   // borderRadius: "4px",
  //   // cursor: "grab",
  // };

  return (
    <div
      {...attributes}
      {...listeners}
      ref={(node) => {
        setNodeRef(node);
        // sortableNodeRef(node);
      }}
      style={style}
      className={`p-3 border rounded-md flex flex-col justify-evenly gap-3 cursor-grab active:cursor-grabbing
        ${
          isDragging
            ? "bg-primary/40 border-primary/50 rotate-1 scale-105"
            : "bg-primary/20 hover:bg-primary/30 border-primary/30"
        }
        transition-all duration-300`}
    >
      {card.labels.length > 0 && (
        <div
          className="flex gap-2 overflow-scroll scrollbar-hide rounded-full"
          onClick={() => setIsLabelHide((p) => !p)}
        >
          {card.labels.map((label: string, index: number) => (
            <Badge
              className={`${
                colors[index % colors.length]
              } transition-all duration-500 whitespace-nowrap ${
                isLabelHide ? "px-5 py-1" : ""
              }`}
              key={index}
            >
              <span className={`${isLabelHide ? "hidden" : "inline"}`}>
                {label}
              </span>
            </Badge>
          ))}
        </div>
      )}
      <div
        onClick={() => {
          setCardid(card._id);
          onOpen();
        }}
      >
        <h1 className="font-semibold text-white/85">{card.title}</h1>
      </div>

      {(card.dueDate || card.assignees.length > 0) && (
        <div className="flex justify-evenly items-center ">
          <div className="w-1/2">
            <h1 className="text-xs text-muted-foreground">{card.dueDate}</h1>
          </div>
          <div className="flex flex-row-reverse -space-x-1 overflow-scroll scrollbar-hide w-1/2 rounded-full">
            {card.assignees.map((member: IUser) => (
              <img
                key={member._id}
                src={member.profileImg}
                className="w-6 h-6 rounded-full object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
