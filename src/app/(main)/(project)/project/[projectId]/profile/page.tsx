// pages/projects/[projectId]/profile.tsx
"use client";
import React from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateNewRole } from "@/store/roleStore";
import { useGetRoles } from "@/hooks/useRole";
import { useParams } from "next/navigation";
import { useGetProject } from "@/hooks/useProject";

import ProjectHeader from "@/components/project/projectHeader";
import RolesList from "@/components/project/roleList";

export default function ProjectProfile() {
  const { onOpen } = useCreateNewRole();
  
  const { projectId } = useParams() as { projectId: string };
  const { data: projectData, isLoading  } = useGetProject(projectId);
  const { data: rolesData } = useGetRoles(projectId);

  if(isLoading){
    return <div>loading....</div>
  }

  return (
    <div className="flex bg-zinc-900 text-gray-200 h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Area with Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Content Area */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Banner Section */}
            <ProjectHeader 
              projectData={projectData?.data} 
            />

            {/* Profile Info */}
            <div className="mt-14 px-8">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
                    {projectData?.data?.name}
                  </h2>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-400">{projectData?.data?.description}</p>
              </div>

              {/* Roles Section */}
              <div className="mt-8">
                <div className="space-y-4">
                  {/* Heading and Description */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">Roles</h3>
                    <p className="text-sm text-muted-foreground">
                      Use roles to group your project members and assign
                      permissions.
                    </p>
                  </div>

                  {/* Search and Create Role Button */}
                  <div className="flex justify-between items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search roles..."
                        className="pl-10 bg-primary outline-none border-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                    <Button
                      className="flex items-center gap-2 bg-indigo-500"
                      onClick={() => onOpen()}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Role</span>
                    </Button>
                  </div>

                  {/* Roles List Component */}
                  <RolesList roles={rolesData?.data || []} projectId={projectId} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Activity Log */}
          {/* <ActivityLog /> */}
        </div>
      </div>
    </div>
  );
}