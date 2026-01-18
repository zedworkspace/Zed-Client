import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

export default function LeftSectionLoading() {
  return (
    <>
      <div className=" w-16 flex flex-col gap-3 items-center fixed h-screen bg-black pt-2 border-r border-gray-500/40">
        <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
        <div className="w-[100%] px-2">
          <Separator className="bg-white/40" />
        </div>
        <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
        <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
      </div>
    </>
  );
}
