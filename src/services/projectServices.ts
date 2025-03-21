"use client";
import { IGetProjects, IGetProject } from "@/interface/projectInterface";
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

export const getProject = async (id: string): Promise<IGetProject> => {
  const response = await apiClient.get(API_ROUTES.PROJECT.GET_PROJECT + id);
  return response.data;
};

export const updateProject = async ({projectId,data}:{projectId:string,data:FormData}) => {
  const response = await apiClient.put(API_ROUTES.PROJECT.UPDATE_PROJECT+projectId, data)
  return response.data
}

export const leaveProject = async (id: string) => {
  const response = await apiClient.post(API_ROUTES.PROJECT.LEAVE_PROJECT + id);
  return response.data;
};