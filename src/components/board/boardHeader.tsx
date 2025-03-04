import { IBoard } from "@/interface/boardInterface";
import React from "react";

export default function BoardHeader({ board }: { board?: IBoard }) {
  return (
    <div className="p-3 sticky border-b border-primary/50 text-base">
      {board?.name}
    </div>
  );
}
