import { getMessages, getNotification, markAsRead, sendFile, sendMessage } from "@/services/messageServices"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useSendMessage = (userId:string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: sendMessage,
        onSuccess: ()=>queryClient.invalidateQueries({queryKey:['message'],userId})
    })
}

export const useSendFile = (channelId:string) => {
    const queryClient = useQueryClient ()
    return useMutation({
        mutationFn: sendFile,
        onSuccess:()=>queryClient.invalidateQueries({queryKey:['message'],channelId})
    })
}

export const useGetMessages = (channelId:string) => {
    return useQuery({
        queryKey:['message',channelId],
        queryFn:()=>getMessages(channelId)
    })
}

export const useGetNotification = (channelId:string) => {
    return useQuery({
        queryKey:['notification',channelId],
        queryFn:()=>getNotification()
    })
}

export const useMarkAsRead = (channelId:string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:markAsRead,
        onSuccess:()=> queryClient.invalidateQueries({queryKey:['notification',channelId]})
    })
}