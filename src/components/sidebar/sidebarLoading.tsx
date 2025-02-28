import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";

export default function SidebarLoading() {
  return (
    <div className="w-1/4 h-full">
      <div className="h-1/4 w-full p-0 bg-cover bg-center bg-transparent">
        <Skeleton className="p-4 w-full bg-secondary rounded-none"></Skeleton>
      </div>
      <div className="h-3/4 bg-primary pt-4 space-y-2">
        <Skeleton className="w-full px-2 h-8 bg-secondary rounded-none " />
        <Skeleton className="w-full px-2 h-8 bg-secondary rounded-none" />
        <Skeleton className="w-full px-2 h-8 bg-secondary rounded-none" />
      </div>
    </div>
  );
}
