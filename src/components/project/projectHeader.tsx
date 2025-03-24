/* eslint-disable @next/next/no-img-element */
import { IProject } from "@/interface/projectInterface";
import React from "react";
import { Pencil } from "lucide-react";
import { useEditProjectStore } from "@/store/projectStore";

const ProjectHeader = ({
  projectData,
}: {
  bannerColor: string;
  projectData: IProject["projectId"] | undefined;
}) => {

  const {onOpen} = useEditProjectStore()
  return (
    <div className="relative rounded-t-lg shadow-md">
      <div
        className="relative h-44 flex items-end overflow-hidden bg-primary"
       
      >
        {projectData?.banner && <img src={projectData?.banner} alt="banner" className="w-full"/>}
        <div className="absolute " />

        <button
          className="absolute top-4 right-4 bg-secondary hover:bg-secondary/80 p-2 rounded-full transition-colors"
          aria-label="Edit project"
        >
          <Pencil className="w-5 h-5" onClick={onOpen}/>
        </button>
      </div>

      <div className="absolute -bottom-12 left-8">
        <div className="relative w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 border-background">
          {projectData?.logo ? (
            <img
              src={projectData.logo}
              alt="Project Logo"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-primary flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {projectData?.name?.slice(0, 2)?.toUpperCase() || "PN"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
