import { getProfile } from "@/services/profileServices"
import { useQuery } from "@tanstack/react-query"

export const useGetProfile = (userId:string) => {
    return useQuery({
        queryKey:['profile',userId],
        queryFn: async()=>{
            return await getProfile(userId)
        },
        enabled:!!userId
    })
    
}