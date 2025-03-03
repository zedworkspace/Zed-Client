import React from "react";

export default function Board() {
  return (
    <div className="h-full bg-red-600 flex flex-col">
      <div className="bg-green-500 p-3 sticky top-0 z-10">Header</div>

      <div className="flex-1 w-full overflow-auto scrollbar-hide">
        <div className="bg-blue-600 min-w-max inline-flex space-x-4 p-3">
          <div className="bg-gray-500 w-64 p-3 h-screen">LIST 1</div>
          <div className="bg-emerald-500 w-64 p-3 h-56">LIST 2</div>
          <div className="bg-yellow-600 w-64 p-3 h-[113rem]">LIST 3</div>
          <div className="bg-orange-900 w-64 p-3 h-[10rem]">LIST 4</div>
          <div className="bg-orange-900 w-64 p-3 h-20">LIST 5</div>
        </div>
      </div>
    </div>
  );
}
