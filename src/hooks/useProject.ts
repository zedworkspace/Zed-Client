"use client"
import {
  createProject,
  getProject,
  getProjects,
  updateProject,
  leaveProject,
} from "@/services/projectServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useEditProjectStore, useNewProjectStore } from "@/store/projectStore";

export const useCreateProject = () => {
  const { onClose } = useNewProjectStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: (res) => {
      toast({ description: res.message });
      onClose();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      console.log(err,'object');
      toast({ description: err.message });
    },
  });
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};

export const useGetProject = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id),
  });
};

export const useUpdateProject = (projectId:string) => {
  const queryClient = useQueryClient()
  const {onClose} = useEditProjectStore()
  const {toast} = useToast()
  return useMutation({
    mutationFn:updateProject,
    onSuccess: (data)=>{
      toast({description:data.message})
      queryClient.invalidateQueries({queryKey:['project',projectId]})
      queryClient.invalidateQueries({queryKey:['projects']})
      onClose()
    }
  })
}

export const useLeaveProject = (projectId:string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: leaveProject,
    onSuccess: (res) => {
      toast({ description: res.message });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast({ description: err.message });
    },
  });
};