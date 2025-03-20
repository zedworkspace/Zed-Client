import {
  assignRole,
  createRole,
  deleteRole,
  getRoles,
  getSingleRole,
  removeRole,
} from "@/services/roleServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useAssignRoleStore, useRemoveRoleStore } from "@/store/roleStore";

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

export const useGetSingleRole = (roleId: string) => {
  return useQuery({
    queryKey: ["role", roleId],
    queryFn: () => getSingleRole(roleId),
  });
};

export const useAssignRole = (roleId:string) =>{
  const queryClient = useQueryClient()
  const {toast} = useToast()
  const {onClose} = useAssignRoleStore()
  return useMutation({
    mutationFn:assignRole,
    onSuccess:(data)=>{
      toast({description:data.message})
      onClose()
      queryClient.invalidateQueries({queryKey:["role",roleId]})
    }
  })
}

export const useRemoveFromRole = (roleId:string) => {
  const {toast } = useToast()
  const queryClient = useQueryClient()
  const {onDeleteClose} = useRemoveRoleStore()
  return useMutation({
    mutationFn: removeRole,
    onSuccess:(data)=>{ 
      onDeleteClose()
      toast({description:data.message})
      queryClient.invalidateQueries({queryKey:['role',roleId]})
    }
  })
}
