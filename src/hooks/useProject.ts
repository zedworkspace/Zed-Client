import { create } from "@/services/projectServices";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useNewProjectStore } from "@/store/projectStore";

export const useCreateProject = () => {
  const { onClose } = useNewProjectStore();
  const { toast } = useToast();
  return useMutation({
    mutationFn: create,
    onSuccess: (res) => {
      toast({ description: res.message });
      onClose();
    },
    onError: (err) => {
      toast({ description: err.message });
    },
  });
};
