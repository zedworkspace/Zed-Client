import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const getProfile = async () => {
  const res = await apiClient.get(API_ROUTES.PROFILE.GET);
  return res.data;
};


export const updateProfile = async (formData:FormData) =>{
        const res = await apiClient.put(API_ROUTES.PROFILE.UPDATE, formData)
        return res.data
}

export const logoutUser = async () =>{
        const res = await apiClient.post(API_ROUTES.PROFILE.LOGOUT)
        return res.data
}
