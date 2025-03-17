import { createRole, deleteRole, getRoles } from "@/services/roleServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useCreateRole = (projectId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createRole,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["role", projectId] });
    },
    onError: (err) => {
      toast({ description: err.message });
    },
  });
};

export const useGetRoles = (projectId: string) => {
  return useQuery({
    queryKey: ["role", projectId],
    queryFn: () => getRoles(projectId),
  });
};

export const useDeleteRole = (projectId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: (data) => {
      toast({ description: data.message });
      queryClient.invalidateQueries({ queryKey: ["role", projectId] });
    },
    onError: (err) => {
      toast({ description: err.message });
    },
  });
};
