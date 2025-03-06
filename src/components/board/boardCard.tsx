"use client";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { ICard } from "@/interface/cardInterface";
import { IUser } from "@/interface/userInterface";
import { useCardStore } from "@/store/cardStore";

export default function BoardCard({ card }: { card: ICard }) {
  const colors = [
    "bg-red-400 text-red-900 hover:bg-red-500",
    "bg-blue-400 text-blue-900 hover:bg-blue-500",
    "bg-green-400 text-green-900 hover:bg-green-500",
    "bg-yellow-400 text-yellow-900 hover:bg-yellow-500",
    "bg-purple-400 text-purple-900 hover:bg-purple-500",
  ];

  const [isLabelHide, setIsLabelHide] = useState(true);
  const { onOpen, setCardid } = useCardStore();

  return (
    <div className="p-3 bg-primary/20 hover:bg-primary/30 transition-colors duration-300 border border-primary/30 rounded-md flex flex-col justify-evenly gap-3 cursor-pointer ">
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
          <div className="flex flex-row-reverse -space-x-1 overflow-scroll scrollbar-hide  w-1/2 rounded-full">
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
