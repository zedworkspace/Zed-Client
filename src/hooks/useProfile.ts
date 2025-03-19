import { getProfile, logoutUser, updateProfile } from "@/services/profileServices"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast, useToast } from "./use-toast"
import { useUpdateProfileStore } from "@/store/profileStore"

export const useGetProfile = (userId:string) => {
    return useQuery({
        queryKey:['profile',userId],
        queryFn: async()=>{
            return await getProfile()
        },
        enabled:!!userId
    })
}


export const useUpdateProfile = (userId:string) => {
    const queryClient = useQueryClient()
    const { toast } = useToast();
    const {onClose} = useUpdateProfileStore()
    return useMutation ({
        mutationFn:updateProfile,
        onSuccess:(res)=>{
            toast({description:res.message})
            onClose()
            queryClient.invalidateQueries({queryKey:['profile',userId]})
        },
        onError: (err)=>{
            toast({description:err.message})
        }
    })
}

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.clear();
    //   localStorage.removeItem("accessToken");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      toast({description:error.message})
    },
  });
};