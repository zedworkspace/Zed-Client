import React from "react";
import { Skeleton } from "../ui/skeleton";

const BoardLoading = () => {
  return (
    <div>
      <Skeleton className="w-full h-12 bg-secondary flex items-center">
        <Skeleton className="w-48 h-6 ml-2 bg-primary" />
      </Skeleton>
      <div className="flex mt-2">
        {[...Array(3)].map((_, ind) => (
          <div
            key={ind}
            className={`w-[17vw] ml-5 ${ind % 2 === 0 ? "h-[65vh]" : "h-[47vh]"}`}
          >
            {[...Array(ind % 2 === 0 ? 7 : 5)].map((_, ind2) => (
              <div key={ind2}>
                <Skeleton className="w-64 h-14 mb-2 bg-primary ml-1" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardLoading;
