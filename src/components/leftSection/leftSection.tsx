import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNewProjectStore } from "@/store/projectStore";
import { useNewInviteStore } from "@/store/inviteStore";
import { useGetProjects } from "@/hooks/useProject";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

export default function LeftSection() {
  const { onOpen } = useNewProjectStore();
  const { onOpen: onInviteOpen } = useNewInviteStore();
  const { data, isSuccess, isLoading } = useGetProjects();
  const router = useRouter();

  if (isLoading)
    return (
      <div className=" w-20 flex flex-col gap-3 items-center fixed h-screen bg-background mt-20">
        <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
        <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
        <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
      </div>
    );

  if (isSuccess)
    return (
      <div className=" w-20 flex flex-col gap-3 items-center fixed h-screen bg-background mt-20">
        {data.data.map((project) => (
          <Avatar
            className="w-12 h-12 cursor-pointer"
            key={project._id}
            onClick={() => router.replace(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/project/${project._id}`)}
          >
            <AvatarImage src={project.logo} />
            <AvatarFallback>
              <Skeleton className="w-12 h-12 border-none rounded-full bg-secondary-foreground" />
            </AvatarFallback>
          </Avatar>
        ))}
        <Button
          size="icon"
          className="border-non rounded-full w-12 h-12"
          onClick={onOpen}
        >
          <Plus />
        </Button>
        {/* <Button size="icon" className="border-non rounded-full w-14 h-14" onClick={onInviteOpen}>
        <Plus />
      </Button> */}
      </div>
    );
}
