import React from "react";
import { FileText } from "lucide-react";

export default function CardActivitySection() {
  return (
    <div className="w-64 border-l border-[#40444b] pl-6 rounded-r-lg">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
        <FileText className="h-4 w-4 text-[#b9bbbe]" />
        Activity
      </h3>
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#202225] scrollbar-track-[#2f3136]">
        <div className="text-sm bg-[#32353b] p-3 rounded-lg border border-[#40444b] text-[#b9bbbe]">
          <p className="text-center">No activity recorded yet</p>
        </div>
      </div>
    </div>
  );
}