import apiClient from "@/lib/axios.config"
import API_ROUTES from "@/lib/routes"

export const createRole = async (data:{name:string,permissions:string[],projectId:string}) =>{
    const response = await apiClient.post(API_ROUTES.ROLE.CREATE_ROLE,data)
    return response.data
}

export const assignRole = async (data:{projectId:string,roleId:string,userId:string}) => {
    const response = await apiClient.post(API_ROUTES.ROLE.ASSING_ROLES,data)
    return response.data
}

export const removeRole = async (data:{projectId:string,roleId:string,userId:string}) => {
    const response = await apiClient.post(API_ROUTES.ROLE.REMOVE_ROLES,data)
    return response.data
}

export const getRoles = async (projectId:string) => {
    const response = await apiClient.get(API_ROUTES.ROLE.GET_ROLES+projectId)
    return response.data
}

export const updateRole = async (data:{roleId:string,permissions:string[],name:string}) =>{
    const response = await apiClient.put(API_ROUTES.ROLE.UPDATE_ROLE,data)
    return response.data
}