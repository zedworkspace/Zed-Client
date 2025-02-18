import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function LeftSection() {
  return (
    <div className="p-2 space-y-2">
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
      <Button size="icon" className="border-non rounded-full">
        <Plus />
      </Button>
    </div>
  );
}
