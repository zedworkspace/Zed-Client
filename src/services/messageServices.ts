import apiClient from "@/lib/axios.config"
import API_ROUTES from "@/lib/routes"

export const sendMessage = async( data:{senderId:string,channelId:string,content:string,type:string} ) => {
    const res = await apiClient.post(API_ROUTES.MESSAGE.SEND_MESSAGE, data)
    return res.data
}

export const getMessages = async(channelId:string) => {
    const res = await apiClient.get(`${API_ROUTES.MESSAGE.GET_MESSAGE}/${channelId}`)
    return res.data
}