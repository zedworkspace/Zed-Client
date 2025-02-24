import apiClient from "@/lib/axios.config"
import API_ROUTES from "@/lib/routes"

export const getProfile = async(userId:string)=>{
    try {
        const res = await apiClient.get(`${API_ROUTES.PROFILE.GET}/${userId}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const updateProfile = async ({userId, formData}:{userId:string, formData:FormData}) =>{
        const res = await apiClient.put(`${API_ROUTES.PROFILE.UPDATE}/${userId}`, formData)
        return res.data

}