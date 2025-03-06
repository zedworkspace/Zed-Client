import { createList, getLists } from "@/services/listServices";
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

export const useGetLists = ({
  boardId,
  isEnabled,
}: {
  boardId: string;
  isEnabled: boolean;
}) => {
  return useQuery({
    queryKey: ["lists", boardId],
    queryFn: () => getLists({ boardId }),
    enabled: isEnabled,
  });
};
