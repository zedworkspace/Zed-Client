"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Settings, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetRoles, useGetSingleRole } from "@/hooks/useRole";
import Permissions from "@/components/role/permissions";
import Members from "@/components/role/members";

export default function RolePage() {
  const { roleId, projectId } = useParams() as {
    roleId: string;
    projectId: string;
  };

  const router = useRouter();

  const { data, isLoading } = useGetSingleRole(roleId);
  const { data: roles } = useGetRoles(projectId);
  const [activeTab, setActiveTab] = useState("permissions");

  if (isLoading) {
    return <div>loading details..</div>;
  }
  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      {/* Sidebar  */}
      <div className="w-64 border-r border-zinc-800 p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-5 w-5 text-zinc-400" />
          <h3 className="font-semibold">Roles</h3>
        </div>

        <div className="space-y-1">
          {roles?.data.map((role) => {
            const isActive = roleId === role._id;
            return (
              <button
                key={role.roleId}
                className={`w-full text-left p-2 rounded flex items-center gap-2 hover:bg-zinc-800 text-zinc-400 ${
                  isActive ? `bg-zinc-800 text-white` : ""
                }`}
                onClick={() => router.push(role.roleId)}
              >
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>{role.roleName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-zinc-800 p-4">
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full hover:bg-zinc-800">
              <ChevronLeft
                className="h-5 w-5 text-zinc-400"
                onClick={router.back}
              />
            </button>
            <h1 className="font-bold text-xl">Role Settings</h1>
          </div>
        </header>

        {/* Content */}
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-8 pb-16">
            {/* Role Overview Card */}
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-zinc-100 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Role Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">
                    ROLE NAME
                  </label>
                  <Input
                    value={data?.data.roleName}
                    readOnly
                    // onChange={handleRoleNameChange}
                    className="text-white"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-5 border-b border-zinc-700 pb-2">
              <button
                className={`pb-2 px-1 font-medium ${
                  activeTab === "permissions"
                    ? "text-white border-b-2 border-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setActiveTab("permissions")}
              >
                Permissions
              </button>
              <button
                className={`pb-2 px-1 font-medium ${
                  activeTab === "members"
                    ? "text-white border-b-2 border-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
                onClick={() => setActiveTab("members")}
              >
                Members
              </button>
            </div>

            {activeTab === "permissions" && <Permissions />}
            {activeTab === "members" && (
              <Members
                roleName={data?.data.roleName}
                roleId={roleId}
                roleMembers={data?.data.members}
              />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
