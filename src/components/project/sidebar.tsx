import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowBigDown,
  AudioWaveform,
  ChevronDown,
  Frame,
  Github,
  Trello,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../ui/sidebar";

export default function SideBar() {
  const channels = [
    {
      _id: "2",
      name: "Text Channel",
      url: "#",
      icon: Frame,
    },
    {
      _id: "1",
      name: "Voice Channel",
      url: "#",
      icon: AudioWaveform,
    },
    {
      _id: "3",
      name: "Board",
      url: "#",
      icon: Trello,
    },
    {
      _id: "4",
      name: "GitHub",
      url: "#",
      icon: Github,
    },
  ];
  return (
    <SidebarProvider>
      <Sidebar className="absolute top-0 left-0 z-0 border-none bg-primary">
        <SidebarHeader
          className="bg-gray-500 h-1/4 w-full p-0"
          style={{
            backgroundImage:
              "url('https://imgs.search.brave.com/s2tI5morK2fJn3WWCMMCHD3kGWvEtuN9qbvBO7wJpKY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzQ2LzgyLzU3/LzM2MF9GXzk0Njgy/NTc1Nl9qZGR2Mk5h/cGN0d0JXamxuSWxZ/dGFkVngzeHVPQk4w/Ti5qcGc')",
          }}
        >
          <div className="flex justify-between items-center bg-black bg-opacity-20 p-4 w-full text-white text-xl font-semibold">
            <div>
              <h1 className="">Zed</h1>
            </div>
            <div>
              <ChevronDown />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-primary">
          <SidebarGroup>
            {/* <SidebarGroupLabel className="font-semibold text-sm text-muted-foreground">
              Voice Channels
            </SidebarGroupLabel> */}
            <SidebarMenu className="">
              {channels.map((channel) => (
                <SidebarMenuItem
                  key={channel._id}
                  className="flex justify-center items-center"
                >
                  <SidebarMenuButton
                    asChild
                    className="font-semibold hover:bg-secondary"
                  >
                    <a href={channel.url} className="items-center">
                      <channel.icon className="text-muted-foreground" />
                      <span className="text-white">{channel.name}</span>
                    </a>
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
