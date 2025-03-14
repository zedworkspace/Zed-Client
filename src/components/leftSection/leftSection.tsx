import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNewProjectStore } from "@/store/projectStore";
import { useGetProjects } from "@/hooks/useProject";
import LeftSectionLoading from "./leftSectionLoading";
import LeftSectionProjectAvatars from "./leftSectionProjectAvatars";

export default function LeftSection() {
  const { onOpen } = useNewProjectStore();

  const { data, isSuccess, isLoading, isError } = useGetProjects();

  if (isLoading) return <LeftSectionLoading />;

  if (isError) return <div>Something happened</div>;

  if (isSuccess)
    return (
      <div className=" w-20 flex flex-col gap-3 items-center fixed h-screen bg-background mt-20">
        {data?.data.map((project) => (
          <LeftSectionProjectAvatars
            key={project.projectId._id}
            project={project}
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
