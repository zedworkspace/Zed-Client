import { CreateRole, GetRole } from "@/interface/roleInterFace";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const createRole = async (data: {
  name: string;
  projectId: string;
}): Promise<CreateRole> => {
  const response = await apiClient.post(API_ROUTES.ROLE.CREATE_ROLE, data);
  return response.data;
};

export const assignRole = async (data: {
  projectId: string;
  roleId: string;
  userId: string[];
}) => {
  const response = await apiClient.post(API_ROUTES.ROLE.ASSING_ROLES, data);
  return response.data;
};

export const removeRole = async (data: {
  projectId: string;
  roleId: string;
  userId: string;
}) => {
  const response = await apiClient.post(API_ROUTES.ROLE.REMOVE_ROLES, data);
  return response.data;
};

export const getRoles = async (projectId: string): Promise<GetRole> => {
  const response = await apiClient.get(
    API_ROUTES.ROLE.GET_ROLES + "/" + projectId
  );
  return response.data;
};

export const updateRole = async (data: {
  roleId: string;
  permissions?: string[];
  name?: string;
}) => {
  console.log(data.permissions,'laskdjflkajsdlfkj');
  const response = await apiClient.put(API_ROUTES.ROLE.UPDATE_ROLE, data);
  return response.data;
};

export const deleteRole = async (data: {
  roleId: string;
  projectId: string;
}) => {
  const response = await apiClient.delete(API_ROUTES.ROLE.DELETE_ROLE, {
    data,
  });
  return response.data;
};

export const getSingleRole = async (roleId: string) => {
  const response = await apiClient.get(
    API_ROUTES.ROLE.GET_SINGLE_ROLE + roleId
  );
  return response.data;
};
