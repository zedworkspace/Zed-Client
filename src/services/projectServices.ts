import { IGetProjects } from "@/interface/projectInterface";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const createProject = async (data: FormData) => {
  const response = await apiClient.post(
    API_ROUTES.PROJECT.CREATE_PROJECT,
    data
  );
  return response.data;
};

export const getProjects = async (): Promise<IGetProjects> => {
  const response = await apiClient.get(API_ROUTES.PROJECT.GET_PROJECTS);
  return response.data;
};
