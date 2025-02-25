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
    <SidebarProvider>
      <Sidebar className="absolute col-span-1 top-0 left-0 z-0 border-none bg-primary">
        <SidebarHeader className="h-1/4 w-full p-0">
          <div className="flex justify-between items-center bg-black bg-opacity-20 p-4 w-full text-white text-xl font-semibold">
            <Skeleton className="h-6 w-24 bg-secondary" />
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-primary">
          <SidebarGroup>
            <SidebarMenu className="space-y-1">
              {[...Array(5)].map((_, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="w-full flex items-center p-2 rounded-md h-10">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="size-5 rounded-full bg-secondary" />
                      <Skeleton className="h-4 w-32 bg-secondary" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
