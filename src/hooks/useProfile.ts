import { getProfile, updateProfile } from "@/services/profileServices"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "./use-toast"
import { useUpdateProfileStore } from "@/store/updateProfileStore"

export const useGetProfile = (userId:string) => {
    return useQuery({
        queryKey:['profile',userId],
        queryFn: async()=>{
            return await getProfile(userId)
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