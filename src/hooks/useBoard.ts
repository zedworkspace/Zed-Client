import { getBoardById, getBoards } from "@/services/boardServices";
import { useQuery } from "@tanstack/react-query";

export const useGetBoards = ({ projectId }: { projectId: string }) => {
  return useQuery({
    queryKey: ["boards", projectId],
    queryFn: async () => await getBoards(projectId),
  });
};

export const useGetBoardById = ({
  boardId,
  projectId,
}: {
  boardId: string;
  projectId: string;
}) => {
  return useQuery({
    queryKey: ["board" + boardId],
    queryFn: async () => await getBoardById({ boardId, projectId }),
  });
};
