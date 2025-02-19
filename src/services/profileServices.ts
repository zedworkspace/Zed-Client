import apiClient from "@/lib/axios.config"
import API_ROUTES from "@/lib/routes"

export const getProfile = async(userId:string)=>{
    console.log(userId,'userId');
    try {
        const res = await apiClient.get(`${API_ROUTES.PROFILE.GET}/${userId}`)
        return res.data
    } catch (error) {
        throw error
    }
}