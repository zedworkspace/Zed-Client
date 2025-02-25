import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function LeftSectionLoading() {
  return (
    <div className=" w-20 flex flex-col gap-3 items-center fixed h-screen bg-background mt-20">
      <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
      <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
      <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
    </div>
  );
}
