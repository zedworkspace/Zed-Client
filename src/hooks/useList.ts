import { useBoardSocket } from "@/context/boardSocketProvider";
import {
  createList,
  getLists,
  updateListPosition,
} from "@/services/listServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateList = ({ boardId }: { boardId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
    },
  });
};

export const useGetLists = ({ boardId }: { boardId: string }) => {
  return useQuery({
    queryKey: ["lists", boardId],
    queryFn: () => getLists({ boardId }),
  });
};

export const useUpdateListPosition = () => {
  const { socket } = useBoardSocket();
  return useMutation({
    mutationFn: updateListPosition,
    onSuccess: (data) => {
      socket?.emit("onChangeListPosition", data.boardId);
    },
  });
};
