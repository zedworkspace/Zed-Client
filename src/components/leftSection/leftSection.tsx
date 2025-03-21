import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useNewProjectStore } from "@/store/projectStore";
import { useGetProjects } from "@/hooks/useProject";
import LeftSectionLoading from "./leftSectionLoading";
import LeftSectionProjectAvatars from "./leftSectionProjectAvatars";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";

export default function LeftSection() {
  
  const { onOpen } = useNewProjectStore();
   const router = useRouter();

  const { data, isSuccess, isLoading, isError } = useGetProjects();

  if (isLoading) return <LeftSectionLoading />;

  if (isError) return <div>Something happened</div>;

  if (isSuccess)
    return (
      <div className=" w-16 flex flex-col gap-3 items-center fixed h-screen bg-black pt-2 border-r border-gray-500/40">
        <Image
                  src="/logo.svg"
                  width={40}
                  height={40}
                  alt="logo"
                  onClick={() => router.replace("/")}
                  className="cursor-pointer"
                />
                <div className="w-[100%] px-2"><Separator className="bg-white/40"/></div>
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
