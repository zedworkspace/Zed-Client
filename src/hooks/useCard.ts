import { createCard } from "@/services/taskServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCard = ({ boardId }: { boardId: string }) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
    },
  });
};
