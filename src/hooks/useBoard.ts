import {
  createBoard,
  getBoardById,
  getBoardMembers,
  getBoards,
} from "@/services/boardServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useGetBoards = ({ projectId }: { projectId: string }) => {
  return useQuery({
    queryKey: ["board", projectId],
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
    queryKey: ["board" + projectId],
    queryFn: async () => await getBoardById({ boardId, projectId }),
  });
};

export const useCreateBoard = (projectId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["board", projectId] });
    },
  });
};

export const useGetBoardMembers = (boardId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["boardMembers", boardId],
    queryFn: async () => await getBoardMembers(boardId),
    enabled,
  });
};
