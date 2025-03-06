import { getBoards } from "@/services/boardServices";
import { useQuery } from "@tanstack/react-query";

export const useGetBoards = ({ projectId }: { projectId: string }) => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(projectId),
  });
};
