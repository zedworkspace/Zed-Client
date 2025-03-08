import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { IProject } from "@/interface/projectInterface";
import { useProjectStore } from "@/store/projectStore";
import { useRouter } from "next/navigation";

type Props = {
  project: IProject;
};
export default function LeftSectionProjectAvatars({ project }: Props) {
  const { setProjectId } = useProjectStore();
  const router = useRouter();
  return (
    <Avatar
      className="w-12 h-12 cursor-pointer"
      key={project.projectId._id}
      onClick={() => {
        router.push(`/project/${project.projectId._id}`);
        setProjectId(project.projectId._id);
      }}
    >
      <AvatarImage src={project?.projectId?.logo} />
      <AvatarFallback>
        <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
      </AvatarFallback>
    </Avatar>
  );
}
