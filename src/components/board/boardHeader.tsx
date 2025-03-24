import { IBoard } from "@/interface/boardInterface";
import { Kanban } from "lucide-react";
import React from "react";

export default function BoardHeader({ board }: { board?: IBoard }) {
  return (
    <div className="p-3 sticky border-b border-primary/50 text-base bg-black flex gap-2 text-white/70">
      <Kanban/>
      {board?.name}
    </div>
  );
}
