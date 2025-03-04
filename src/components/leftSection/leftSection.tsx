import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNewProjectStore, useProjectStore } from "@/store/projectStore";
import { useGetProjects } from "@/hooks/useProject";
import { useRouter } from "next/navigation";
import { useGetChannels } from "@/hooks/useChannel";
import LeftSectionLoading from "./leftSectionLoading";
import LeftSectionProjectAvatars from "./leftSectionProjectAvatars";

export default function LeftSection() {
  const router = useRouter();
  const { projectId } = useProjectStore();
  const [isEnabled, setIsEnabled] = useState(false);

  const { onOpen } = useNewProjectStore();

  const {
    data: projectsData,
    isSuccess: projectSuccess,
    isLoading: projectsLoading,
    isError: projectError,
  } = useGetProjects();

  console.log(projectsData, "dataaaaaa");
  console.log(projectId, "projectId");

  const {
    data: channelsData,
    isSuccess: channelsSuccess,
    isLoading: channelsLoading,
    isError: channelError,
  } = useGetChannels({ projectId, isEnabled });

  useEffect(() => {
    if (channelsSuccess) {
      const generalTextChannel = channelsData?.data.textChannels.find(
        (channel) => channel.type === "text" && channel.isDefault === true
      );
      if (generalTextChannel) {
        sessionStorage.setItem("channelType", "text");
        router.replace(
          `/project/${projectId}/${generalTextChannel?._id}`
        );
      }
    }
  }, [channelsSuccess, router, projectId, channelsData]);

  const isLoading = projectsLoading;
  const isSuccess = channelsSuccess || projectSuccess;
  const isError = projectError || channelError;

  if (isLoading) return <LeftSectionLoading />;

  if (isError) return <div>Something happened</div>;

  if (isSuccess)
    return (
      <div className=" w-20 flex flex-col gap-3 items-center fixed h-screen bg-background mt-20">
        {projectsData?.data.map((project) => (
          <LeftSectionProjectAvatars
            key={project.projectId._id}
            project={project}
            setIsEnabled={setIsEnabled}
          />
        ))}
        <Button
          size="icon"
          className="border-non rounded-full w-12 h-12"
          onClick={onOpen}
        >
          <Plus />
        </Button>
      </div>
    );
}
