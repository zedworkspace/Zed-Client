import React from "react";
import { createPortal } from "react-dom";
import { DragOverlay } from "@dnd-kit/core";
import { IList } from "@/interface/listInterface";
import { ICard } from "@/interface/cardInterface";
import BoardList from "./boardList";
import BoardCard from "./boardCard";

type Props = { activeList: IList | null; activeCard: ICard | null };

export default function DragOverlayWrapper({ activeList, activeCard }: Props) {
  return (
    <div>
      {createPortal(
        <DragOverlay>
          {activeList && <BoardList list={activeList} index={0} />}
          {activeCard && <BoardCard card={activeCard} />}
        </DragOverlay>,
        document.body
      )}
    </div>
  );
}
