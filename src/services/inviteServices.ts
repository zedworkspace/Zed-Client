import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const generateInvite = async (id: string)=> {
    const response = await apiClient.get(API_ROUTES.INVITE.GENERATE_INVITE + id);
    return response.data;
};

export const sendInvite = async (data:{email: string, inviteLink: string})=> {
    const response = await apiClient.post(API_ROUTES.INVITE.SEND_INVITE, data);
    return response.data;
};