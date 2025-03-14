'use client'
import React from "react";
import { Menu, MessageCircle } from "lucide-react";

export default function ChatHeader() {
  return <header className="flex items-center justify-between p-2 border-b-2 border-primary/50 text-base fixed bg-primary w-full"> 
  {/* className="flex items-center justify-between px-6 py-4 bg-black text-white shadow-md"> */}
  <div className="flex items-center space-x-3">
  <MessageCircle className="h-6 w-6 text-muted-foreground" />
  <h1 className="text-xl font-bold text-muted-foreground">General Text</h1>
  <div className="flex items-center">
  {/* <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
<Menu className="h-5 w-5 text-gray-300" />
</button> */}
  </div>
  </div>
  </header>;
}
