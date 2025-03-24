/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeHeader from "@/components/home/homeheader"; 
import { useNewProjectStore, useProjectStore } from "@/store/projectStore";
import { useGetProjects } from "@/hooks/useProject";
import { useRouter } from "next/navigation";

const dummyMembersData = {
  data: [
    {
      userId: {
        _id: "user1",
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      role: "Admin"
    },
    {
      userId: {
        _id: "user2",
        name: "Sarah Wilson",
        email: "sarah@example.com",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg"
      },
      role: "Developer"
    },
    {
      userId: {
        _id: "user3",
        name: "Mike Chen",
        email: "mike@example.com",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg"
      },
      role: "Designer"
    },
    {
      userId: {
        _id: "user4",
        name: "Emma Davis",
        email: "emma@example.com",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg"
      },
      role: "Product Manager"
    },
    {
      userId: {
        _id: "user5",
        name: "James Smith",
        email: "james@example.com",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg"
      },
      role: "Developer"
    }
  ]
};

export default function Page({ projectId }: { projectId: string }) {
  console.log(projectId, "Project ID in Page component");

  const { onOpen } = useNewProjectStore();
  const { setProjectId } = useProjectStore();
  const { data } = useGetProjects();
  
  // Use dummy data for now, but keep the hook for when you're ready to use real data
  // const { data: membersData, isLoading, error } = useGetProjectMembers({
  //   projectId,
  //   enabled: !!projectId,
  // });

  // Use dummy data instead of actual API response for development
  const members = dummyMembersData;
  
  console.log(members, "Members Data Response");

  const router = useRouter();

  // Function to generate initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col justify-center bg-neutral-900/100 min-h-screen">
      <HomeHeader />

      <div className="p-6">
        <div className="rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-6">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((project, index) => (
              <div key={index} className="bg-primary rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={project?.projectId?.logo}
                      alt={`${project.projectId.name} logo`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-muted-foreground">
                        {project.projectId.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {project.projectId.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Team Members</span>
                      </div>
                      
                      <div className="flex -space-x-2 overflow-hidden">
                        {members.data.slice(0, 5).map((member, i) => (
                          <div 
                            key={i} 
                            className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                            title={`${member.userId.name} - ${member.role}`}
                          >
                            {member.userId.avatar ? (
                              <img 
                                src={member.userId.avatar} 
                                alt={member.userId.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                                {getInitials(member.userId.name)}
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {members.data.length > 5 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
                            +{members.data.length - 5}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <Button
                          className="bg-primary"
                          onClick={() => {
                            router.push(`/project/${project.projectId._id}`);
                            setProjectId(project.projectId._id);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="bg-primary rounded-lg border-2 border-dashed border-gray-500 p-6 flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer"
              onClick={onOpen}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                <span className="text-2xl text-gray-500">+</span>
              </div>
              <h3 className="text-lg font-medium text-muted-foreground">
                Create Project
              </h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                Start a new project collaboration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}