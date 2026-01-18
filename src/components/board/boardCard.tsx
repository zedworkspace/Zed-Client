/* eslint-disable @next/next/no-img-element */
"use client";
import { Badge } from "../ui/badge";
import { ICard } from "@/interface/cardInterface";
import { IUser } from "@/interface/userInterface";
import { useCardStore } from "@/store/cardStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function BoardCard({ card }: { card: ICard }) {
  const colors = [
    "bg-red-400 text-red-900 hover:bg-red-500",
    "bg-blue-400 text-blue-900 hover:bg-blue-500",
    "bg-green-400 text-green-900 hover:bg-green-500",
    "bg-yellow-400 text-yellow-900 hover:bg-yellow-500",
    "bg-purple-400 text-purple-900 hover:bg-purple-500",
  ];

  const { setCardid, onOpen } = useCardStore();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { type: "card", card } });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  // Calculate due date status
  let dueDateText = "";
  let dueDateColor = "text-white/70"; // Default color

  if (card.dueDate) {
    const today = dayjs().startOf("day");
    const dueDate = dayjs(card.dueDate).startOf("day");
    const diffDays = dueDate.diff(today, "day");

    if (diffDays < 0) {
      dueDateText = `Expired ${Math.abs(diffDays)} days ago`;
      dueDateColor = "text-red-500 font-bold";
    } else if (diffDays === 0) {
      dueDateText = "Today";
      dueDateColor = "text-green-500 font-bold";
    } else {
      dueDateText = `${diffDays} days left`;
      dueDateColor = "text-white/70";
    }
  }

  if (isDragging) {
    return (
      <div
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={style}
        className={`p-3 border opacity-20 rounded-md flex flex-col justify-evenly gap-3 cursor-grab active:cursor-grabbing shadow-md shadow-black/50 font-sans bg-primary/20 hover:bg-primary/30 border-primary/30 transition-all duration-300`}
      >
        {card.labels.length > 0 && (
          <div className="flex gap-2 overflow-scroll scrollbar-hide rounded-full">
            {card.labels.map((label: string, index: number) => (
              <Badge
                className={`${
                  colors[index % colors.length]
                } transition-all duration-500 whitespace-nowrap`}
                key={index}
              >
                <span className="font-bold text-black/70">{label}</span>
              </Badge>
            ))}
          </div>
        )}
        <div>
          <h1 className="font-semibold text-white/85">{card.title}</h1>
        </div>

        {(card.dueDate || card.assignees.length > 0) && (
          <div className="flex justify-evenly items-center ">
            <div className="w-1/2">
              {card.dueDate && (
                <h1 className={`text-xs ${dueDateColor}`}>{dueDateText}</h1>
              )}
            </div>
            <div className="flex flex-row-reverse -space-x-1 overflow-scroll scrollbar-hide w-1/2 rounded-full">
              {card.assignees.map((member: IUser) => (
                <img
                  key={member._id}
                  src={member.profileImg}
                  alt="profileImg"
                  className="w-6 h-6 rounded-full object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      onClick={() => {
        setCardid(card._id);
        onOpen();
      }}
      className={`p-3 border rounded-md flex flex-col justify-evenly gap-3 cursor-grab active:cursor-grabbing shadow-md shadow-black/50 font-sans bg-primary/20 hover:bg-primary/30 border-primary/30 transition-all duration-300`}
    >
      {card.labels.length > 0 && (
        <div className="flex gap-2 overflow-scroll scrollbar-hide rounded-full">
          {card.labels.map((label: string, index: number) => (
            <Badge
              className={`${
                colors[index % colors.length]
              } transition-all duration-500 whitespace-nowrap`}
              key={index}
            >
              <span className="font-bold text-black/70">{label}</span>
            </Badge>
          ))}
        </div>
      )}
      <div>
        <h1 className="font-semibold text-white/85">{card.title}</h1>
      </div>

      {(card.dueDate || card.assignees.length > 0) && (
        <div className="flex justify-evenly items-center ">
          <div className="w-1/2">
            {card.dueDate && (
              <h1 className={`text-xs ${dueDateColor}`}>{dueDateText}</h1>
            )}
          </div>
          <div className="flex flex-row-reverse -space-x-1 overflow-scroll scrollbar-hide w-1/2 rounded-full">
            {card.assignees.map((member: IUser) => (
              <img
                key={member._id}
                src={member.profileImg}
                alt="profileImg"
                className="w-6 h-6 rounded-full object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
