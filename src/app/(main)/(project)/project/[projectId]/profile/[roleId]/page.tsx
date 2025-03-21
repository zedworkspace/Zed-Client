"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Plus, Settings, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetRoles, useGetSingleRole, useUpdateRole } from "@/hooks/useRole";
import Permissions from "@/components/role/permissions";
import Members from "@/components/role/members";
import SaveChanges from "@/components/role/saveChanges";
import { Button } from "@/components/ui/button";
import { useCreateNewRole } from "@/store/roleStore";

export default function RolePage() {
  const { roleId, projectId } = useParams() as {
    roleId: string;
    projectId: string;
  };
  const { onOpen } = useCreateNewRole();

  const router = useRouter();

  const { data, isLoading, isSuccess } = useGetSingleRole(roleId);
  const { data: roles } = useGetRoles(projectId);
  const { mutate } = useUpdateRole(roleId, projectId);
  const [activeTab, setActiveTab] = useState("permissions");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (isSuccess) {
      setName(data?.data.roleName);
    }
  }, [data?.data.roleName, isSuccess]);

  const colors = [
    "bg-red-500 text-red-800",
    "bg-blue-500 text-blue-800",
    "bg-green-500 text-green-800",
    "bg-yellow-500 text-yellow-800",
    "bg-purple-500 text-purple-800",
    "bg-pink-500 text-pink-800",
  ];

  if (isLoading) {
    return <div>loading details..</div>;
  }
  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      <div className="w-64 border-r border-zinc-800 p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-5 w-5 text-zinc-400" />
          <h3 className="font-semibold">Roles</h3>
        </div>

        <div className="space-y-1">
          {roles?.data.map((role, index) => {
            const isActive = roleId === role._id;
            return (
              <button
                key={role.roleId}
                className={`w-full text-left p-2 rounded flex items-center gap-2 hover:bg-zinc-800 text-zinc-400 ${
                  isActive ? `bg-zinc-800 text-white` : ""
                }`}
                onClick={() => router.push(role.roleId)}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    colors[index % colors.length]
                  }`}
                ></div>
                <span>{role.roleName}</span>
              </button>
            );
          })}
          <Button
            className="w-full text-left p-2 rounded flex items-center gap-2 hover:bg-zinc-800 text-zinc-400"
            onClick={() => onOpen()}
          >
            <Plus className="h-4 w-4" />
            <span>Create Role</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
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

        <ScrollArea className="flex-1 px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-8 pb-16">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-white"
                  />
                </div>
              </CardContent>
            </Card>
            {name.trim() !== data?.data.roleName && (
              <SaveChanges
                onClick={() => mutate({ roleId, name })}
                onCancel={() => setName(data?.data.roleName)}
              />
            )}

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

            {activeTab === "permissions" && (
              <Permissions
                roleId={roleId}
                existingPermissions={data?.data.permissions}
              />
            )}
            {activeTab === "members" && (
              <Members
                roleName={data?.data.roleName}
                roleMembers={data?.data.members}
              />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
