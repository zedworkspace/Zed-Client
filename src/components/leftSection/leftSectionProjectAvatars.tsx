import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { IProject } from "@/interface/projectInterface";
import { useProjectStore } from "@/store/projectStore";

type Props = {
  project: IProject;
  setIsEnabled: (value: boolean) => void;
};
export default function LeftSectionProjectAvatars({
  project,
  setIsEnabled,
}: Props) {
  const { setProjectId } = useProjectStore();
  return (
    <Avatar
      className="w-12 h-12 cursor-pointer"
      key={project.projectId._id}
      onClick={() => {
        setProjectId(project.projectId._id);
        setIsEnabled(true);
      }}
    >
      <AvatarImage src={project?.projectId?.logo} />
      <AvatarFallback>
        <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
      </AvatarFallback>
    </Avatar>
  );
}
