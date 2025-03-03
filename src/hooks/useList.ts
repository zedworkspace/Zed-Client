import { createList } from "@/services/listServices";
import { useMutation } from "@tanstack/react-query";

export const useCreateList = () => {
  return useMutation({
    mutationFn: createList,
  });
};
