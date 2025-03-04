import { getBoardById, getBoards } from "@/services/boardServices";
import { useQuery } from "@tanstack/react-query";

export const useGetBoards = ({ projectId }: { projectId: string }) => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: () => getBoards(projectId),
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
    queryFn: () => getBoardById({ boardId, projectId }),
  });
};

