import React, { useState } from "react";

export default function CreateTask() {
  const [isAddTask, setIsAddTask] = useState(false);

  return (
    <div>
      {isAddTask && (
        <div className="p-3 bg-primary/20 hover:bg-primary/30 transition-colors duration-300 border border-primary/30 rounded-md flex flex-col justify-evenly gap-3 cursor-pointer">
          THis is input
        </div>
      )}
      <div
        className="p-3 bg-primary/20 hover:bg-primary/30 transition-colors duration-300 border border-primary/30 rounded-md flex flex-col justify-evenly gap-3 cursor-pointer"
        onClick={() => setIsAddTask(true)}
      >
        Add Task
      </div>
    </div>
  );
}
