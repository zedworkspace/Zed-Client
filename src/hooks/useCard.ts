import { useBoardSocket } from "@/context/boardSocketProvider";
import {
  createCard,
  deleteCardById,
  getCard,
  updateCardPositionBetweenList,
  updateCardPositionInDnd,
  updateCardPositionWithInList,
  updatedCard,
} from "@/services/taskServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useCreateCard = ({ boardId }: { boardId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
    },
  });
};
export const useGetCard = ({
  cardId,
  isOpen,
}: {
  cardId: string;
  isOpen: boolean;
}) => {
  return useQuery({
    queryKey: ["card", cardId],
    queryFn: async () => {
      return await getCard({ cardId });
    },
    enabled: isOpen,
  });
};

export const useUpdateCard = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatedCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
    },
  });
};

export const useUpdateCardPositionWithInList = () => {
  const { socket } = useBoardSocket();
  return useMutation({
    mutationFn: updateCardPositionWithInList,
    onSuccess: (data) => {
      socket?.emit("onChangeCardPositionWithInList", data.data.boardId);
    },
  });
};

export const useUpdateCardPositionBetweenList = () => {
  const { socket } = useBoardSocket();
  return useMutation({
    mutationFn: updateCardPositionBetweenList,
    onSuccess: (data) => {
      socket?.emit("onChangeCardPositionWithInList", data.data.boardId);
    },
  });
};

export const useUpdateCardPositionInDnd = () => {
  const { socket } = useBoardSocket();
  return useMutation({
    mutationFn: updateCardPositionInDnd,
    onSuccess: (data) => {
      socket?.emit("onChangeCardPositionWithInList", data.data.boardId);
    },
  });
};

export const useDeleteCardById = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCardById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
      toast({ title: data.message });
    },
  });
};
