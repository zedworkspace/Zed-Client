import React from "react";
import { Skeleton } from "../ui/skeleton";

const ChatLoading = () => {
  return (
    <div className="pb-4 w-full h-full flex flex-col justify-between">
      <Skeleton className="flex items-center justify-between p-2 border-b-2 border-primary/50 text-base fixed bg-primary w-full">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-6 w-6 bg-secondary rounded-full" />
          <Skeleton className="w-44 h-6 font-bold bg-secondary" />
        </div>
      </Skeleton>

      <div className="flex flex-col overflow-y-auto scrollbar-hide mx-5 pb-16 mt-28 space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full bg-primary" />

            <div className="flex flex-col space-y-2">
              <Skeleton className="w-48 h-6 bg-primary rounded-lg" />
              <Skeleton className="w-40 h-4 bg-primary rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 w-full px-4 h-14 flex items-center">
        <Skeleton className="w-full h-10 bg-primary rounded-lg" />
      </div>
    </div>
  );
};

export default ChatLoading;
