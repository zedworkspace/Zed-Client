"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProfileStore, useUpdateProfileStore } from "@/store/profileStore";
import { useGetProfile } from "@/hooks/useProfile";
import { ProfileActivity } from "./Activity";
import { ProfileMyWork } from "./MyWork";
import { ProfileAssigned } from "./Assigned";
import Image from "next/image";
import { User2Icon, UserPen, Activity, Briefcase, Users } from "lucide-react";

export const ProfileSheet = () => {
  const [activeTab, setActiveTab] = useState<
    "activity" | "mywork" | "assigned"
  >("activity");

  const { isOpen, onClose, profileId } = useProfileStore();
  const { data } = useGetProfile(profileId);
  const { onOpen } = useUpdateProfileStore();

  const tabs = [
    { id: "activity", label: "Activity", icon: <Activity size={16} /> },
    { id: "mywork", label: "My Work", icon: <Briefcase size={16} /> },
    { id: "assigned", label: "Assigned", icon: <Users size={16} /> },
  ];
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="fixed flex flex-col gap-0 p-0 border-l border-gray-800 bg-gradient-to-b from-primary to-primary/95">
        <div className="pt-6 sticky top-0 z-50 bg-primary/95 backdrop-blur-sm">
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>

          {/* Profile Info Section */}
          <div className="flex flex-col items-center mt-2 mb-6">
            <div className="relative mb-2 group">
              {data?.profileImg ? (
               <div className="relative">
               {/* <div className="absolute inset-0 rounded-full bg-gray-500/40 blur-md opacity-75 group-hover:opacity-90 transition-opacity"></div> */}
               <Image
                 width={100}
                 height={100}
                 src={data.profileImg}
                 alt="Profile"
                 className="rounded-full w-24 h-24 object-cover shadow-lg shadow-white/10 relative z-10"
               />
             </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="bg-gray-800 rounded-full p-2 relative z-10">
                    <User2Icon className="w-20 h-20 text-gray-300" />
                  </div>
                </div>
              )}
              <button 
                onClick={onOpen}
                className="absolute bottom-0 right-0 bg-secondary hover:bg-secondary/90 p-2 rounded-full shadow-lg z-20 transition duration-300"
              >
                <UserPen size={16} className="text-white" />
              </button>
            </div>
            
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              {data?.name || "User Name"}
            </h3>
            
            <p className="text-sm text-gray-400 mt-1">
              {data?.bio || "No bio provided"}
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex  rounded ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 py-3 px-4 relative ${
                  activeTab === tab.id
                    ? "text-white font-extrabold"
                    : "text-gray-400 hover:text-gray-300"
                } transition-colors duration-200`}
                onClick={() => setActiveTab(tab.id as never)}
              >
                <span>{tab.icon}</span>
                <span className="font-medium text-sm">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto bg-secondary  flex-grow p-6">
          {activeTab === "activity" && <ProfileActivity />}
          {activeTab === "mywork" && <ProfileMyWork />}
          {activeTab === "assigned" && <ProfileAssigned />}
        </div>
      </SheetContent>
    </Sheet>
  );
};