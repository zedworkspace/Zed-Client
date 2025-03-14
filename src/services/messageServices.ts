import apiClient from "@/lib/axios.config"
import API_ROUTES from "@/lib/routes"

export const sendMessage = async( data:{senderId:string,channelId:string,content:string,type:string} ) => {
    const res = await apiClient.post(API_ROUTES.MESSAGE.SEND_MESSAGE, data)
    return res.data
}

export const sendFile = async (data:FormData) =>{
    const res = await apiClient.post(API_ROUTES.MESSAGE.SEND_FILE,data)
    return res.data
}

export const getMessages = async(channelId:string) => {
    const res = await apiClient.get(`${API_ROUTES.MESSAGE.GET_MESSAGE}/${channelId}`)
    return res.data
}

export const getNotification = async() => {
    const res = await apiClient.get(API_ROUTES.MESSAGE.GET_NOTIFICATION)
    return res.data
}

export const markAsRead = async (channelId: string) => {
    const res = await apiClient.put(`${API_ROUTES.MESSAGE.UPDATE_READ}/${channelId}`)
    return res.data
}