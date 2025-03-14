import { createCard, getCard, updatedCard } from "@/services/taskServices";
import { useCardStore } from "@/store/cardStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  console.log("cardid", cardId);
  return useQuery({
    queryKey: ["card", cardId],
    queryFn: async () => {
      return await getCard({ cardId });
    },
    enabled: isOpen,
  });
};

export const useUpdateCard = (boardId: string) => {
  const { onClose } = useCardStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatedCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
      onClose();
    },
  });
};
