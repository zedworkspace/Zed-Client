import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";


export const create = async (data: FormData) => {
  const response = await apiClient.post(API_ROUTES.PROJECT.CREATE, data);
  return response.data;
};
